import {getClientUrls} from '/lib/enonic/react4xp';
import thymeleaf from '/lib/thymeleaf';


const VIEW = resolve('withHelpers.html');

//const PROJECT = 'default';
//const BRANCH = 'master';
const SITE_NAME = 'webapp';
//const SITE_ROOT = `/site/${PROJECT}/${BRANCH}/${SITE_NAME}`;


function toStr(value, replacer, space = 4) {
  return JSON.stringify(value, replacer, space);
}


export function get(req) {
  const clientUrls = getClientUrls();
  log.debug(`clientUrls:%s`, toStr(clientUrls));

  const bodyEndArray = [];
  for (let i = 0; i < clientUrls.length; i++) {
    bodyEndArray.push(`<script src="${clientUrls[i]}"></script>`);
  }
  //log.debug(`bodyEndArray:%s`, toStr(bodyEndArray));

  const model = {
    bodyEnd: bodyEndArray.join('\n'),
    movieType: `${app.name}:movie`,
    sitePath:  `/${SITE_NAME}`,
  };

  return {
    contentType: 'text/html',
    body: thymeleaf.render(VIEW, model)
  };
}
