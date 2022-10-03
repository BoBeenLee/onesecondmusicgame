import axios, {AxiosResponse} from 'axios';

import env from 'src/configs/env';
import {getRootStore} from 'src/stores/Store';
import {ITracks} from 'src/apis/soundcloud/interface';

export const getTrackToPlayStreamUri = async (trackId: string) => {
  const response: AxiosResponse<ITracks> = await axios({
    url: `${env.SOUNDCLOUD_API_URL}/tracks/${trackId}`,
    params: {
      client_id: getRootStore().authStore.soundCloudCliendId,
    },
  });
  const transcodings = response.data.media?.transcodings ?? [];
  for (const transcode of transcodings) {
    if ((transcode.url ?? '').endsWith('/progressive')) {
      return await getPlayStreamUri(transcode.url);
    }
  }
};

export const getPlayStreamUri = async (uri: string) => {
  if (!uri) {
    return '';
  }
  const response: AxiosResponse<{url: string}> = await axios({
    url: uri,
    params: {
      client_id: getRootStore().authStore.soundCloudCliendId,
    },
  });
  const data = response.data;
  return data.url;
};
