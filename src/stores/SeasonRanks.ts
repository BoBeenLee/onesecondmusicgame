import _ from 'lodash';
import {flow, types} from 'mobx-state-tree';
import {getRankingInfoOfSeasonUsingGET} from 'src/apis/rank';
import {RankView} from '__generate__/api';

export interface ISeasonRankItem {
  nickname: string;
  point: number;
  rankDiff: number;
  profileImageUrl: string;
}

const SeasonRanks = types
  .model('SeasonRanks', {
    isRefresh: types.optional(types.boolean, false),
    ranks: types.optional(types.array(types.frozen<RankView>()), []),
    lastSeasonTop3: types.optional(types.array(types.frozen<RankView>()), []),
    currentSeason: types.optional(types.number, 0),
    timeToFinishThisSeasonSeconds: types.optional(types.number, 0),
    myRank: types.frozen<RankView | null>(null),
  })
  .views(self => {
    return {
      get rankViews() {
        return Array.from(self.ranks).map(item => {
          return {
            ...item,
            isMyRank: item.nickname === self.myRank?.nickname,
          };
        });
      },
      get isMyRankIncludeRanks() {
        return this.rankViews.some(
          item => item.nickname === self.myRank?.nickname,
        );
      },
      get finishThisSeasonFormat() {
        const remainSeconds = self.timeToFinishThisSeasonSeconds;
        const minutes = _.ceil(remainSeconds / 60);
        const hours = _.ceil(minutes / 60);
        const days = _.ceil(hours / 24);
        return `종로까지 남은 시간 : ${days}일 ${hours % 24}시간 ${
          minutes % 60
        }분`;
      },
    };
  })
  .actions(self => {
    const clear = () => {
      self.isRefresh = false;
      self.ranks.clear();
    };

    const fetch = flow(function* () {
      const response: RetrieveAsyncFunc<typeof getRankingInfoOfSeasonUsingGET> =
        yield getRankingInfoOfSeasonUsingGET();

      self.currentSeason = response?.currentSeason ?? 0;
      self.timeToFinishThisSeasonSeconds =
        response?.timeToFinishThisSeason ?? 0;
      self.myRank = response?.myRank ?? null;
      self.ranks.replace(response?.currentSeasonRanking?.rankViewList ?? []);
      self.lastSeasonTop3.replace(response?.lastSeasonTop3 ?? []);
    });

    const initialize = flow(function* () {
      clear();
      yield fetch();
    });

    const refresh = flow(function* () {
      if (self.isRefresh) {
        return;
      }
      self.isRefresh = true;
      clear();
      yield fetch();
      self.isRefresh = false;
    });

    return {
      clear,
      initialize,
      refresh,
    };
  });

export type ISeasonRanks = typeof SeasonRanks.Type;

export default SeasonRanks;
