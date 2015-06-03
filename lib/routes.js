Router.route('home', {
    path: '/',
    template: 'home'
});

Router.route('show_plot', {
    path: '/plots/:plot_uuid',
    template: 'home',
    data: function() {
        return {
            plot_uuid: this.params.plot_uuid
        }
    }
});
