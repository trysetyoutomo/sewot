
$$(document).on('submit', '#form-reset-password', function (e) {
    var password   = $$("#password").val(); 
    var repassword = $$("#repassword").val();
    var decodeuser = atob(window.localStorage.getItem('username'));
    if (password != repassword) { myApp.alert('password tidak sama', ['Peringatan']); } 
    else {
        $$.ajax({
            url: server+"/index.php?r=api/postforgotpassword",
            data: {password: password, repassword: repassword, username: decodeuser},
            success:function(data){
                var dataObj  = JSON.parse(data)
                if (dataObj.status) { 
                    myApp.alert(dataObj.message, 'Informasi', function () {
                        window.localStorage.removeItem('username');
                        window.location.assign("http://localhost:3000/main.html");
                    });
                } else {
                    customAlert(dataObj.message, 'Peringatan');
                }
             },
            error:function(err){
                customAlert('Oops terjadi kesalahan', 'Peringatan');
            }
        });
    } 
});
$$(document).on('click', '#check-tracking-3', function (e) {
    var status = $("#check-tracking2-3").prop('checked');
    var ukm_id = window.localStorage.getItem("ukm_id");
    console.log(ukm_id);
    console.log(status);
    // var status = $(".label-switch").hasClass("active-state");
    // console.log(status);
    $$.ajax({
        url: server+"/index.php?r=api/PostSetting",
        data: {
            ukm_id: ukm_id, 
            status: status,
            for_what:"delivery", 
        },
        success:function(data){
            console.log(data);
            // var dataObj  = JSON.parse(data)
            // if (dataObj.status) { 
            //     myApp.alert(dataObj.message, 'Informasi', function () {
            //         window.localStorage.removeItem('username');
            //         window.location.assign("http://localhost:3000/main.html");
            //     });
            // } else {
            //     customAlert(dataObj.message, 'Peringatan');
            // }
         },
        error:function(err){
            // customAlert('Oops terjadi kesalahan', 'Peringatan');
        }
    });
});

$$(document).on('click', '.open-minimum', function (e) {
    var ukm_id = window.localStorage.getItem("ukm_id");
    myApp.prompt( 'Masukan Minumum Pemesanan', [ 'Minimum Pemesanan'],
    function (value) {
      if (value == '') {
        customAlert('Minimum Pemesanan harap diisi', 'Peringatan');
        // console.log("kosong");
      } else {
        // console.log("terisi");
        // console.log(value);
        if (validateNumber(value)) {
            console.log("angka");
            $$.ajax({
                url: server+"/index.php?r=api/PostSetting",
                data: {
                    ukm_id: ukm_id, 
                    value: value,
                    for_what:"minimal", 
                },
                success:function(data){
                    // console.log(data);
                    // reload
                    reloadSetting(ukm_id);
                 },
                error:function(err){
                    console.log(err);
                }
            });
        } else {
            console.log("bukan angka");
            customAlert('Format harus angka', 'Peringatan');
        }  
      }
    },
    function(value) {
      // myApp.alert('silahkan check email anda', ['']);
    }
  );
});

blink('.realtime-circle-on');

$$(document).on('click', '.open-nama-umkm', function (e) {
    var ukm_id = window.localStorage.getItem("ukm_id");
    myApp.prompt( 'Masukan Nama UMKM', [ 'Nama UMKM'],
    function (value) {
      if (value == '') {
        customAlert('Nama UMKM harap diisi', 'Peringatan');
        // console.log("kosong");
      } else {
        // console.log("terisi");
        // console.log(value);
        // if (validateNumber(value)) {
            // console.log("angka");
            $$.ajax({
                url: server+"/index.php?r=api/PostSetting",
                data: {
                    ukm_id: ukm_id, 
                    value: value,
                    for_what:"nama", 
                },
                success:function(data){
                    // console.log(data);
                    // reload
                    reloadSetting(ukm_id);
                 },
                error:function(err){
                    console.log(err);
                }
            });
        // } else {
        //     console.log("bukan angka");
        //     customAlert('Format harus angka', 'Peringatan');
        // }  
      }
    },
    function(value) {
      // myApp.alert('silahkan check email anda', ['']);
    }
  );
});

$$(document).on('click', '.btn-get-atm', function (e) {
    mainView.router.load({
      url:"atm-terdekat.html" 
   });
});
$$(document).on('click', '.btn-get-va', function (e) {
    var c = confirm("Yakin Melakukan Pembayaran Dengan Virtual Account ?");
    if (!c){
        return false;
    }

    var ukm_id = window.localStorage.getItem("ukm_id");
    var jumlah_sewpay = $("#sewpay-uang").attr("asli");
    var jumlah_akhir = $(".nilai-akhir").attr("asli");

    if ( parseInt(jumlah_akhir)<=0){
      myApp.addNotification({
          message: " Tagihan Kosong ",
          button: {
                text: 'Tutup',
              },
              hold : 2000
         });
      exit;
    }
    var bulan = $$("#bulan-tagihan").val();
    var tahun = $$("#tahun-tagihan").val();
            $$.ajax({
                url: server+"/index.php?r=api/VirtualAccount",
                data: {
                    ukm_id: ukm_id, 
                    jumlah_sewpay: jumlah_sewpay,
                    tujuan:"bayar_tagihan", 
                    jumlah_akhir:jumlah_akhir,
                    bulan : bulan,
                    tahun : tahun
                },
                success:function(data){
                    // if ()
                    var d = JSON.parse(data);
                    if (d.statusCode=="500"){
                        $$.each(d.payload.errors,function(s,v){
                            alert(v.message);
                        });
                    }else if (d.success){
                      myApp.addNotification({
                          message: "Tagihan Berhasi DI Bayar",
                          buttonkey:  {
                              text: 'Tutup',
                          },
                          hold : 2000
                      });
                      mainView.router.back();


                    }
                 },
                error:function(err){
                    console.log("error");
                    console.log(err);
                }
            });
  //       } else {
  //           console.log("bukan angka");
  //           customAlert('Format harus angka', 'Peringatan');
  //       }  
  //     }
  //   },
  //   function(value) {
  //     // myApp.alert('silahkan check email anda', ['']);
  //   }
  // );
});
