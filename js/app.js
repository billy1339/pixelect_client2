var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'users': 'users',
        'images': 'images',
        'upload_image_set' : 'upload_image_set',
        'postImages': 'postImages',
        'image_sets/:id' : 'image_sets',
    },

    home: function() {
      $('#content').empty();
      $('#myCarousel').show();
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/favorite/get_favorite',
            type: 'GET'
        }).done(function(response) {
            console.table(response);
            var template = Handlebars.compile($('#homePopSetsTemplate').html());
              $('#pop_script').html(template({
                pop_image_set: response
            }));
        });
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/recent/get_recent',
            type: 'GET'
        }).done(function(response) {
            console.table(response);
            var template = Handlebars.compile($('#homeRecSetsTemplate').html());
              $('#rec_script').html(template({
                rec_image_set: response
            }));
        });
    },

    // upload_pics: function() {
    //   $('#myCarousel').hide();
    //   $('#content').empty();

    //   var template = Handlebars.compile($("#uploadPicsTemplate").html());
    //     $('#content').html(template({

    //     }));

    // },

    upload_image_set: function() {
      $('#myCarousel').hide();
      $('#content').empty()
      var template = Handlebars.compile($('#uploadTemplate').html());
          $('#content').html(template({
                // picSet: response
            }));

      $.ajax({
        url: 'https://pixelect-rails-api.herokuapp.com/image_sets',
        type: 'POST',
        data: {image_set: {
                votingCriteria: $('#content').find('input[name="voting-criteria"]').val(),
                user_id: 1,
                total_likes: 0
            }
        }
      }).done(function(response){
        console.log(response);
      });
    },

    users: function() {
      $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/users',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#usersTemplate').html());
              $('#content').html(template({
                user: response
            }));
        });
    },

    image_sets: function(id) {
        $('#content').empty();
        $('#myCarousel').hide();
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/image_sets/' + id,
            type: 'GET'
        }).done(function(response) {
          console.table(response);
            var template = Handlebars.compile($('#imageSetTemplate').html());
              $('#content').html(template({
                image_set: response
            }));
        });
    },

    images: function() {

      $('#content').empty();
      $('#myCarousel').hide();


        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/images',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#imagesTemplate').html());
              $('#content').html(template({
                image: response
            }));
        });
    },


    comments: function() {
        $('#myCarousel').hide();
        $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/comments',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#commentsTemplate').html());
              $('#content').html(template({
                comment: response
            }));
        });
    },

    likes: function() {
        $('#myCarousel').hide();
        $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/likes',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#likesTemplate').html());
              $('#content').html(template({
                like: response
            }));
        });
    }
});
// var events = function() {
//     $('.see-image-set').on('click', image_sets);
// };

// $(function() {
//     events;
// })

  // $('#content').on('click', '#submitComment', function() {
        // e.preventDefault();

    var comment_post = function() {

        // console.log($(this).attr("data-id"))
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/comments',
            type: 'POST',
            data: {comment: {
                body: $('#content').find('input[name="createComment"]').val(),
                user_id: 1,
                image_set_id: $(this).attr("data-id")}
            }
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#imageSetTemplate').html());
              $('<li>').append(template({
                comment: response
            }));

        });
    };

    // var upload3Pics = function() {
    //   $.ajax({
    //     url: 'https://pixelect-rails-api.herokuapp.com/upload_pics',
    //     type: 'POST',
    //     data: { image: {id: 1 ,file_name: "kitten.jpg", image_file: " ", image_url:"www.kitten.com",flag: 0, image_set_id: 1}

    //     }
    //   }).done(function(response) {
    //     console.log(response);
    //     var template = Handlebars.compile($("#uploadPicsTemplate").html());
    //     $('#content').html(template({

    //     }));
    //   })
    // }


$(document).ready(function () {
  $('#content').on('click', '#submitComment', comment_post);
  // for (var i = 0; i < 3; i++) 
  //   upload3Pics(i);
});

var router = new Router();


Backbone.history.start();