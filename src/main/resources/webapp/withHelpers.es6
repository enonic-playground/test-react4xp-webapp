import {getClientUrl} from '/lib/enonic/react4xp';
import thymeleaf from '/lib/thymeleaf';


const VIEW = resolve('withHelpers.html');

const PROJECT = 'default';
const BRANCH = 'master';
const SITE_NAME = 'webapp';
//const SITE_ROOT = `/site/${PROJECT}/${BRANCH}/${SITE_NAME}`;


function toStr(value, replacer, space = 4) {
  return JSON.stringify(value, replacer, space);
}


export function get(req) {
  const clientUrl = getClientUrl();
  //log.debug(`clientUrl:%s`, toStr(clientUrl));

  const model = {
    bodyEnd: `<script src="${clientUrl}"></script>`,
    BRANCH,
    movieType: `${app.name}:movie`,
    PROJECT,
    SITE_NAME
  };

  return {
    contentType: 'text/html',
    body: thymeleaf.render(VIEW, model)
  };
}
