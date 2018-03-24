/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () =>  {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL', () =>  {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).toContain('http');
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', () => {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
        });
    });

    describe('"The menu"', () => {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element hidden by default', () => {

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when icon clicked', () => {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('"Initial Entries"', () =>{
        /* When the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach( (done) => {
            loadFeed(0, done);
        });
            it('Completes with entries in feed', () =>  {
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });
    });

    describe('"New Feed Selection"', () => {
            /* When a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * Remember, loadFeed() is asynchronous.
             */

        let feedBefore;
        let feedAfter;
        loadFeed(0, () => { });
        feedBefore = $('.feed').html();
        beforeEach((done) => {
            loadFeed(1, () => { done() });
            feedAfter = $('.feed').html();
        });

        it('checks for content changes', (done) =>{
            expect(feedBefore).not.toEqual(feedAfter);
            done();
        });
    });

}());
