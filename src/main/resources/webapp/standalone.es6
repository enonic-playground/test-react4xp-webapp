import {getComponentChunkUrls} from '/lib/enonic/react4xp';
import thymeleaf from '/lib/thymeleaf';
import {
  assetUrl as getAssetUrl,
  serviceUrl as getServiceUrl
} from '/lib/xp/portal';


const VIEW = resolve('standalone.html');

const PROJECT = 'default';
const BRANCH = 'master';
const SITE_NAME = 'webapp';
const SITE_ROOT = `/site/${PROJECT}/${BRANCH}/${SITE_NAME}`;


/*function toStr(value, replacer, space = 4) {
  return JSON.stringify(value, replacer, space);
}*/


export function get() {
  const componentChunkUrls = getComponentChunkUrls(['MovieList']);
  //log.debug(`componentChunkUrls:%s`, toStr(componentChunkUrls));

  const bodyEndArray = [];
  for (let i = 0; i < componentChunkUrls.length; i++) {
    const url = componentChunkUrls[i];
    const ext = url.split('.').pop();
    if (ext === 'css') {
      bodyEndArray.push(`<link rel="stylesheet" type="text/css" href="${url}" />`);
    } else if (ext === 'js') {
      bodyEndArray.push(`<script src="${url}"></script>`);
    }
  }
  //log.debug(`bodyEndArray:%s`, toStr(bodyEndArray));


  return {
    contentType: 'text/html',
    body: thymeleaf.render(VIEW, {
      apiUrl: `${SITE_ROOT}/api/headless`,
      assetRoot: getAssetUrl({path: ''}),
      bodyEnd: bodyEndArray.join('\n'),
      serviceRoot: getServiceUrl({service: ''}),
      SITE_NAME
    })
  };
}
