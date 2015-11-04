
angular.module("app").factory('BlogFeed', function($http,config) {

    var Feeds = {};

    Feeds = {
        categories:"",
        posts:[],
        finishedloading:false
    };

    Feeds.getPosts = function(){

        $http.get(config.service_url + 'blog-items').
            success(function(data, status, headers) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data);
                //Feeds.posts = data;

                _.each(data,function(post){

                    var blogPost = {};

                    blogPost.nid = post.nid[0].value;

                    blogPost.title = post.title[0].value;

                    var date = new Date(post.created[0].value*1000);

                    blogPost.created = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                    var image_fid = post.field_image[0].target_id;

                    Feeds.getImage(image_fid,function(response){

                        blogPost.image_url = response.uri[0].value.replace("public:/",config.service_url + "sites/default/files");

                    });

                    blogPost.body = post.body[0].value;

                    Feeds.posts.push(blogPost);

                });

                Feeds.finishedloading = true;

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //return undefined;
            });
    };

    Feeds.getPosts();

    Feeds.getImage = function(fid,callback){

        $http.get(config.service_url + 'entity/file/' + fid).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data);
                //Feeds.posts = data;

                return callback(data);

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //return undefined;
            });
    };


    return Feeds;


});

angular.module("app").factory('BlogFeedFields', function($http,config) {

    var Feeds = {};

    Feeds = {
        categories:"",
        posts:[],
        finishedloading:false
    };

    Feeds.getPosts = function(){

        $http.get(config.service_url + 'blog-items-fields').
            success(function(data, status, headers) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data);
                //Feeds.posts = data;

                _.each(data,function(post){

                    var blogPost = {};

                    blogPost.nid = post.nid;

                    blogPost.path = post.path.replace(config.service_base_path,"");

                    blogPost.title = post.title;

                    blogPost.created = post.created;

                    blogPost.image_string = post.field_image;

                    blogPost.body = post.body;

                    Feeds.posts.push(blogPost);

                });

                Feeds.finishedloading = true;

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //return undefined;
            });
    };

    Feeds.getPosts();

    return Feeds;

});

angular.module("app").factory('BlogSinglePost', function($http,config) {

    var Post = {};

    Post.getPost = function(nid){

        $http.get(config.service_url + 'node/' + nid + '?_format=json').
            success(function(data, status, headers) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data);
                //Feeds.posts = data;

                Post.nid = data.nid[0].value;
                Post.title = data.title[0].value;

                var image_fid = data.field_image[0].target_id;

                Post.getImage(image_fid,function(response){

                    Post.image_url = response.uri[0].value.replace("public:/",config.service_url + "sites/default/files");

                });

                Post.body = data.body[0].value;

                //Post.info = blogPost;

                //console.log(Post);

                Post.finishedloading = true;

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //return undefined;
            });
    };

    Post.getImage = function(fid,callback){

        $http.get(config.service_url + 'entity/file/' + fid + '?_format=json').
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data);
                //Feeds.posts = data;

                return callback(data);

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //return undefined;
            });
    };


    return Post;


});

angular.module("app").factory('AliasSrv', function($http,config) {

    var Alias = {};

    Alias.getIdByTitle = function(title,callback){

        $http.get(config.service_url + 'get-alias-id/' + title).
            success(function(data, status, headers, config) {

                // this callback will be called asynchronously
                // when the response is available

                _.each(data,function(post){
                    Alias.nid = data[0].nid;
                });

                return callback(Alias);

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                return undefined;
            });
    };

    return Alias;


});