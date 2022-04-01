import Router from '/lib/router';
import {get as getStandalone} from './standalone';
import {get as getWithHelpers} from './withHelpers';


const router = Router();


router.all('/', () => ({
  body: `<html>
  <head>
  	<title>Test React4xp Webapp</title>
  </head>
  <body>
  	<h1>Test React4xp Webapp</h1>
  	<ul>
  		<li><a href="standalone/">standalone</a></li>
      <li><a href="withHelpers/">withHelpers</a></li>
  	</ul>
  </body>
</html>`
}));
router.all('/standalone', (r) => getStandalone(r));
router.all('/withHelpers', (r) => getWithHelpers(r));


export const all = (r) => router.dispatch(r);
