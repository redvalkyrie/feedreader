/**
 *information obtained from the following sources:
 *https://stackoverflow.com/
 *https://www.w3schools.com/
 * https://discussions.udacity.com/
 */
$(function() {
    /**
     * @description: tests that allFeeds in app.js is defined and not empty.
     */
    describe('RSS Feeds', () =>  {

        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * @description: loops through allFeeds in app.js and checks to ensure
         * each feed has a defined URL which is not empty.
         */
        it('has URL', () =>  {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).toContain('http');
            });
        });

        /**
         * @description: tests that allFeeds in app.js to ensure each feed has
         * a name that is defined and is not empty.
         */
        it('has name', () => {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
        });
    });
    /**
     * @description: checks to ensure menu is hidden by default.
     */
    describe('"The menu"', () => {

        it('menu element hidden by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
          /**
          * @description: checks that menu visibility changes when first clicked
          * and hidden upon second click.
          */
        it('menu changes visibility when icon clicked', () => {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /**
     * @description: checks that there is at least one .entry element in the
     * .feed container when loadFeed is called and completes its work.
     */
    describe('"Initial Entries"', () =>{

        beforeEach( (done) => {
            loadFeed(0, done);
        });
            it('Completes with entries in feed', () =>  {
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });
    });
    /**
     * @description: checks to ensure that when a new feed is loaded by loadFeed,
     * that the content changes.
     */
    describe('"New Feed Selection"', () => {
        let feedBefore;
        let feedAfter;
        loadFeed(0, () => { });
        feedBefore = $('.feed').html();
        beforeEach((done) => {
            loadFeed(1, () => { done() });
            feedAfter = $('.feed').html();
        });

        it('checks for content changes', (done) =>{
            expect(feedBefore).toBeDefined();
            expect(feedAfter).toBeDefined();
            expect(feedBefore).not.toEqual(feedAfter);
            done();
        });
    });

}());
