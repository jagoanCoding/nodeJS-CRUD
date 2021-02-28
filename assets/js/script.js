

$('#add_user').submit(function(event){

    alert('Data will be upload ..')

})

$('#update_user').submit(function(event) {
    
    event.preventDefault()

    var unidexed_arr = $(this).serializeArray();
    var data = {}

    $.map(unidexed_arr, function(n, i) {
        data[n['name']] = n['value']
    })

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')

    var request = {
        'url' : `http://localhost:3000/api/users/${id}`,
        'method' : 'PUT',
        'data' : data
    }
        
        var yakin = confirm("Yakin dengan data yg anda masukan ?");

        if (yakin) {
           
            $.ajax(request).done(function(response) {
                window.location = "/";
            })
            
        } else {
            alert('Silahkan Lakukan perubahan lagi jika diperlukan')
        }
       


    

})

if(window.location.pathname == '/') {
    $ondelete = $('.table tbody td a.delete')

    $ondelete.click(function(){
        var id = $(this).attr('data-id')
        var request = {
            'url' : `http://localhost:3000/api/users/${id}`,
            'method' : 'DELETE'
        }

        if(confirm("Do you really to delete users")) {
            $.ajax(request).done(function(response) {
                location.reload()
            })
        }
    })
}

$('a#reload').click(function(){
    location.reload();
})
