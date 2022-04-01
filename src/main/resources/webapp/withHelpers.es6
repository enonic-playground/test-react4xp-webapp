import thymeleaf from '/lib/thymeleaf';


const view = resolve('withHelpers.html');
const SITE_NAME = 'webapp';


exports.get = req => {
    const model = {
        sitePath:  `/${SITE_NAME}`,
        movieType: `${app.name}:movie`
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, model)
    };
};
