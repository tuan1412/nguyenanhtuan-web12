$(document).ready(function () {
    let ajaxCall;
    $('#search').submit(function (e) {
        e.preventDefault();
        $('#result-list').empty();
        const userQuery = $('#keyword').val();
        if (!userQuery) {
            $('.loader').hide();
            return;
        }
        let nextPage;
        const appendData = items => {
            if (items.length == 0) {
                $('#result-list').append($('<div/>').text('Không có kết quả thỏa mãn'));
                return;
            }
            items.forEach(element => {
                const { id, snippet } = element;
                const { videoId } = id;
                const { title, description, thumbnails } = snippet;
                const { url, width, height } = thumbnails.medium;
                $('#result-list').append(
                    $('<a/>')
                        .addClass('result col-md-12')
                        .attr('href', `https://youtube.com/watch?v=${videoId}?autoplay=true`)
                        .attr('target', '_blank')
                        .append(`<img src="${url}" height="${height}" width="${width}">`)
                        .append($('<div/>')
                            .addClass('video_info')
                            .append(`<h2 class="title">${title}</h2>`,
                                `<p class="description">${description}</p>`)
                        )
                );
            });
        }
        if (ajaxCall != null) {
            ajaxCall.abort();
            ajaxCall = null;
        }
        ajaxCall = $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${userQuery}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
            type: 'GET',
            success: response => {
                const { items, nextPageToken } = response;
                nextPage = nextPageToken;
                appendData(items);
                $('.loader').hide();

                $(window).scroll(function () {
                    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                        $.ajax({
                            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${userQuery}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPage}`,
                            type: 'GET',
                            success: response => {
                                const { items, nextPageToken } = response;
                                nextPage = nextPageToken;
                                appendData(items);
                            },
                            error: response => {
                                $('#result-list').append($('<div/>').text('Không có kết quả thỏa mãn'));
                                $('.loader').hide();
                            }
                        });
                    }
                });
            },
            error: response => console.log('abort')
        });
    });

    $('#keyword').on('input', function () {
        $('.loader').show();
        setTimeout(() => {
            $('#search').submit();
        }, 1000);

    });
})