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
                        map: map,
                        label: data[i]['DEPARTMENT'].toUpperCase(),
                    });

                    const cityCircle = new google.maps.Circle({
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

                    marker.addListener("click", (e) => {
                        $('#modals-info').append(`
                        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel"><b>Country: Perú</b> | <b>Departament:</b> ${data[i].DEPARTMENT.toUpperCase()} | <b>Population:</b> ${data[i].POPULATION}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6><b>GENERAL DATA:</b></h6>
                                <b>COORDS:</b> Lat: ${data[i].LAT}, Lng: ${data[i].LNG}<br>
                                <b>PORC_MINOR:</b> ${data[i].PORC_MINOR}%<br>
                                <b>PORC_LOW_INCOME:</b> ${data[i].PORC_LOW_INCOME}%<br>
                                <b>DEMOGRAPHIC_INDEX:</b> ${data[i].DEMOGRAPHIC_INDEX}<br>
                                <img src="${data[i].image_url}" width="30%" alt="${data[i].DEPARTMENT.toUpperCase()}">
                                <b>AREA:</b> ${data[i].AREA} km2
                            </div>
                            <div class="col-md-6">
                            <div class="work_img_box rounded">
                        <a class="img-zoom" target='_blank' href="https://static-media-files-ianalytycs.sfo3.digitaloceanspaces.com/spaceCODE/leyenda_data.jpg"></a>
                        <div class="work_images">
                            <img src="https://static-media-files-ianalytycs.sfo3.digitaloceanspaces.com/spaceCODE/leyenda_data.jpg" alt="image" class="img-fluid mx-auto d-block">
                            <div class="work_overlay">
                                <h4>INDEX_EJ: ${data[i].DEPARTMENT.toUpperCase()}</h4>
                                <h6>Legend</h6>
                            </div>
                        </div>
                    </div>
                            </div>
                           </div> 
                            <h5>Indexes EJ:</h5>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#INDEX_EJ</th>
                                            <th scope="col">Value</th>
                                            <th scope="col">#INDEX_EJ</th>
                                            <th scope="col">Value</th>
                                            <th scope="col">#INDEX_EJ</th>
                                            <th scope="col">Value</th>
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
                                <hr>
                                <h5>Indices processed from Indexes EJ (Percentile):</h5>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#INDEX_EJ</th>
                                            <th scope="col">Value</th>
                                            <th scope="col">#INDEX_EJ</th>
                                            <th scope="col">Value</th>
                                            <th scope="col">#INDEX_EJ</th>
                                            <th scope="col">Value</th>
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
                        `);
                        $('#staticBackdrop').modal('show');
                    });

                    //break;
                }
            }
        });
    });

}
