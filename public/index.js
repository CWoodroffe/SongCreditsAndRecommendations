jQuery(document).ready(function() {
    
});

$('#searchForm').submit(function(e){      //Song search event
    e.preventDefault();
    var searchURL = 'https://genius-song-lyrics1.p.rapidapi.com/search/?q=' + $('#songName').val() + '&per_page='       //Genius search query
         + $('#perPage').val() + '&page=1';     
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
                    if(Object.keys(searchData.hits).length == 0){
                        alert("No results.");
                        return;
                    }
                    for (var i  = 0; i < Object.keys(searchData.hits).length; i++){     //Iterate through all returned results, populate HTML.
                        $('#allResults').append(
                          '<hr>'          
                        + '<div class="searchResult">'
                            + '<img src="' + searchData.hits[i].result.song_art_image_thumbnail_url + '"'
                                + ' alt="song art: ' + searchData.hits[i].result.full_title + '"'
                                + ' width="150" height="150">'
                            + '</img>'
                            + '<p>' + searchData.hits[i].result.full_title + '</p>'
                            + '<p>' + searchData.hits[i].result.release_date_for_display + '</p>'
                        + '</div>'
                        )
                    }
                },
                fail: function(error) {
                    // Non-200 return, do something with error
                    alert(error);
                    console.log(error);
                }
            });

        },
        fail: function(error) {
            // Non-200 return, do something with error
            alert(error);
            console.log(error);
        }
    }); 
});