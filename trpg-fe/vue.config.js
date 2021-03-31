module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                @import "@/styles/main.scss";
                `
            }
        }
    },
    chainWebpack: config=>{
        config
            .plugin('html')
            .tap(args=>{
                args[0].title= "<%= title || 'TRPG Toaster'%>"
                return args
            })
    },
    indexPath: "index.ejs"
};
