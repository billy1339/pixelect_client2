var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'users': 'users',
        'upload_image_set' : 'upload_image_set',
        'image_sets/:id' : 'image_sets',
        'about' : 'about'
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

    upload_image_set: function() {
      $('#myCarousel').hide();
      $('#content').empty()
      var template = Handlebars.compile($('#uploadTemplate').html());
          $('#content').html(template({
            }));
      },

    // might use this for user accounts in the future
    // users: function() {
    //   $('#content').empty();

    //     $.ajax({
    //         url: 'https://pixelect-rails-api.herokuapp.com/users',
    //         type: 'GET'
    //     }).done(function(response) {
    //         console.log(response);
    //         var template = Handlebars.compile($('#usersTemplate').html());
    //           $('#content').html(template({
    //             user: response
    //         }));
    //     });
    // },

    image_sets: function(id) {
        $('#content').empty();
        $('#myCarousel').hide();
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/image_sets/' + id,
            type: 'GET'
        }).done(function(response) {
          console.table(response);
            var responseJSON = response.to_json;
            console.log(responseJSON);
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

    about: function() {
        $('#myCarousel').hide();
        $('#content').empty();
        var template = Handlebars.compile($('#aboutTemplate').html());
          $('#content').html(template({
        }));
    },

});

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
            console.log(response.body);
            var template = Handlebars.compile($('#commentsTemplate').html());
              $('#bodyOfComments').append(template({
                comment: response.body
            }));
        });
    };

    var create_image_set = function() {
      // console.log($('#content').find('input[name="voting-criteria"]').val());
        $.ajax({
          url: 'https://pixelect-rails-api.herokuapp.com/image_sets',
          type: 'POST',
          data: {image_set: {
                voting_criteria: $('#content').find('input[name="voting-criteria"]').val(),
                user_id: '',
                total_likes: 0}
          }
        }).done(function(response){
          console.log(response);
          var template = Handlebars.compile($('#imageSetImageTemplate').html());
          $('#content').html(template({
                image_set: response
            }));
        });
      };


    var create_like = function() {
         $.ajax({
                url: 'https://pixelect-rails-api.herokuapp.com/likes',
                type: 'POST',
                data: {like: { image_id: $(this).attr("data-id") }
                }
            }).done(function(response) {
              var imageId = response.image_id;
              var currentValue = $("li[data-id='"+imageId+"']").html();
              var newValue = parseInt(currentValue) + 1;
              $("li[data-id='"+imageId+"']").html(newValue);
              console.log(response.image_id);
          });
        };


$(document).ready(function () {
  $('#content').on('click', '#submitComment', comment_post);
  $('#content').on('click', '#submit-picture-set', create_image_set);
  $('#pop_script').on('click', '.imageToClick', create_like);
  $('#rec_script').on('click', '.imageToClick', create_like);
  $('#content').on('click', '.clickImage', create_like);
});

var router = new Router();


Backbone.history.start();
