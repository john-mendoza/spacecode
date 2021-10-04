function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(-12.022164, -77.072122),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROUTE
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    map.setTilt(0);

    $.getJSON("space_code_data.json", function (json) {
        let data = json;
        var markersArray = [];
        $("#exampleFormControlSelect2").change(function (e) {
            const departament = e.target.value;

            for (let i = 0; i < data.length; i++) {
                if (departament === data[i]['DEPARTMENT']) {
                    let departamento_coord = { 'lat': data[i]['LAT'], 'lng': data[i]['LNG'] }
                    var pinVerde = new google.maps.MarkerImage("https://static-media-files-ianalytycs.sfo3.digitaloceanspaces.com/spaceCODE/green-dot.png");
                    var pinRojo = new google.maps.MarkerImage("https://static-media-files-ianalytycs.sfo3.digitaloceanspaces.com/spaceCODE/red-dot.png");
                    var pinAmarillo = new google.maps.MarkerImage("https://static-media-files-ianalytycs.sfo3.digitaloceanspaces.com/spaceCODE/yellow-dot.png");
                    var pinAzul = new google.maps.MarkerImage("https://static-media-files-ianalytycs.sfo3.digitaloceanspaces.com/spaceCODE/blue-dot.png");
                    var pinNaranja = new google.maps.MarkerImage("https://static-media-files-ianalytycs.sfo3.digitaloceanspaces.com/spaceCODE/orange-dot.png");

                    const marker = new google.maps.Marker({
                        index: data[i]['DEPARTMENT'],
                        position: departamento_coord,
                        icon: pinAzul,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        map: map,
                        label: data[i]['DEPARTMENT'].toUpperCase()+' - '+'CLICK HERE',
                    });

                    markersArray.push(marker);
                    new google.maps.Circle({
                        strokeColor: "#80ffbbe7",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#80ffbbe7",
                        fillOpacity: 0.35,
                        map,
                        center: departamento_coord,
                        label: parseInt(data[i].POPULATION),
                        radius: Math.sqrt(parseInt(data[i].POPULATION)) * 100,
                    });

                    $("#exampleFormControlSelect3").change(function (e) {
                        let indexEJ = e.target.value;
                        if (indexEJ) {
                            if (data[i][indexEJ] < 80) {
                                marker.setIcon(pinAzul);
                            } else if (80 < data[i][indexEJ] && data[i][indexEJ] <= 90) {
                                marker.setIcon(pinAmarillo);
                            } else if (90 < data[i][indexEJ] && data[i][indexEJ] <= 95) {
                                marker.setIcon(pinNaranja);
                            } else {
                                marker.setIcon(pinRojo);
                            }
                        }
                    });

                    marker.addListener('click', (function (index) {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                        return function () {
                            clickMarkerEvent(index, markersArray, data);
                        };
                    })(markersArray.length - 1));
                }
            }
        });
    });
}


function clickMarkerEvent(index, markersArray, data) {
    let departament = markersArray[index].index
    for (let i = 0; i < data.length; i++) {
        if (departament === data[i]['DEPARTMENT']) {
            $('#modals-info').empty();
            $('#modals-info').append(`
            <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title" id="staticBackdropLabel"><b>Country: </b>Perú | <b>Departament:</b> ${data[i].DEPARTMENT.toUpperCase()} | <b>Population:</b> ${data[i].POPULATION}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <b>COORDS:</b> Lat: ${data[i].LAT}, Lng: ${data[i].LNG}<br>
                                <b>PORC_MINOR:</b> ${data[i].PORC_MINOR}%<br>
                                <b>PORC_LOW_INCOME:</b> ${data[i].PORC_LOW_INCOME}%<br>
                                <b>DEMOGRAPHIC_INDEX:</b> ${data[i].DEMOGRAPHIC_INDEX}<br>
                                <b>AREA:</b> ${data[i].AREA} km2 <br>
                                <a style="color:rgb(15, 8, 44); font-size: 1.2rem" href="https://static-media-files-ianalytycs.sfo3.digitaloceanspaces.com/spaceCODE/leyenda_data.jpg" target='_blank'><u>Legend of EJ indices <i class="fas fa-external-link-alt"></i></u></a>
                            </div>
                            <div class="col-md-6 text-center">
                            <img style="border: 2px solid rgb(15, 8, 44); border-radius:5px" src="${data[i].image_url}" width="40%" alt="${data[i].DEPARTMENT.toUpperCase()}">

                            </div>
                           </div> 
                            <h5>Environmental Justice Indices (EJ Indices):</h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">EJ_INDEX</th>
                                            <th scope="col">VALUE</th>
                                            <th scope="col">EJ_INDEX</th>
                                            <th scope="col">VALUE</th>
                                            <th scope="col">EJ_INDEX</th>
                                            <th scope="col">VALUE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">D_CANCR_2</th>
                                            <td>${data[i].D_CANCR_2}</td>
                                            <th scope="row">D_RESP_2</th>
                                            <td>${data[i].D_RESP_2}</td>
                                            <th scope="row">D_PTRAF_2</th>
                                            <td>${data[i].D_PTRAF_2}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">D_PWDIS_2</th>
                                            <td>${data[i].D_PWDIS_2}</td>
                                            <th scope="row">D_PRMP_2</th>
                                            <td>${data[i].D_PRMP_2}</td>
                                            <th scope="row">D_PTSDF_2</th>
                                            <td>${data[i].D_PTSDF_2}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">D_OZONE_2</th>
                                            <td>${data[i].D_OZONE_2}</td>
                                            <th scope="row">D_PM25_2</th>
                                            <td>${data[i].D_PM25_2}</td>
                                            <th scope="row"></th>
                                            <td></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                                </div>
                                <hr>
                                <h5>New indices processed from EJ Indices (Percentile):</h5>
                                <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">EJ_INDEX</th>
                                            <th scope="col">VALUE</th>
                                            <th scope="col">EJ_INDEX</th>
                                            <th scope="col">VALUE</th>
                                            <th scope="col">EJ_INDEX</th>
                                            <th scope="col">VALUE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <th scope="row">P_CANCR_2</th>
                                            <td>${parseInt(data[i].P_CANCR_2)}</td>
                                            <th scope="row">P_RESP_2</th>
                                            <td>${parseInt(data[i].P_RESP_2)}</td>
                                            <th scope="row">P_PTRAF_2</th>
                                            <td>${parseInt(data[i].P_PTRAF_2)}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">P_PWDIS_2</th>
                                            <td>${parseInt(data[i].P_PWDIS_2)}</td>
                                            <th scope="row">P_PRMP_2</th>
                                            <td>${parseInt(data[i].P_PRMP_2)}</td>
                                            <th scope="row">P_PTSDF_2</th>
                                            <td>${parseInt(data[i].P_PTSDF_2)}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">P_OZONE_2</th>
                                            <td>${parseInt(data[i].P_OZONE_2)}</td>
                                            <th scope="row">P_PM25_2</th>
                                            <td>${parseInt(data[i].P_PM25_2)}</td>
                                            <th scope="row"></th>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                        </div>
                                    </div>
                                </div>

                </div>
            `);
            $('#staticBackdrop').modal('show');
            break;
        }
    }

}
