jQuery(document).ready(function() {
    
});

$('#searchForm').submit(function(e){      //Song search event
    e.preventDefault();
    var searchURL = 'https://genius-song-lyrics1.p.rapidapi.com/search/?q=' + $('#entryBox').val() + '&per_page=10&page=1';     //search query
    jQuery.ajax({   //Ajax call to retrieve RapidAPI key
        type: 'get',
        url: '/GeniusKey',
        success: function (keyData) {
            jQuery.ajax({       //On success, use key to search via the Genius API
                async: true,
                crossDomain: true,
                url: searchURL,
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': keyData.key,
                    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
                },
                success: function (searchData) {
                    console.log(searchData.hits[0].result.title);
                    console.log(searchData.hits[1].result.title);
                    console.log(searchData.hits[2].result.title);
        
                },
                fail: function(error) {
                    // Non-200 return, do something with error
                    $('#blah').html("Error");
                    console.log(error);
                }
            });

        },
        fail: function(error) {
            // Non-200 return, do something with error
            $('#blah').html("Error");
            console.log(error);
        }
    }); 
});    