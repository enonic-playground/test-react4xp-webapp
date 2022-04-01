import thymeleaf from '/lib/thymeleaf';
import {
  assetUrl as getAssetUrl,
  serviceUrl as getServiceUrl
} from '/lib/xp/portal';


const VIEW = resolve('webapp.html');
const SITE_NAME = 'webapp';


exports.get = () => ({
        contentType: 'text/html',
        body: thymeleaf.render(VIEW, {
          apiUrl: `/admin/site/preview/default/draft/${SITE_NAME}/api/headless` ,
          assetRoot: getAssetUrl({path: ''}),
          serviceRoot: getServiceUrl({service: ''}),
          SITE_NAME
        })
});
