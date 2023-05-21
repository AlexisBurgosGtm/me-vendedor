function getView(){
    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            ${view.vista_listado()}
                        </div>
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                           ${view.vista_documentos()}
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_detalle()}
                        </div>    
                    </div>

                    <ul class="nav nav-tabs hidden" id="myTabHome" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active negrita text-success" id="tab-uno" data-toggle="tab" href="#uno" role="tab" aria-controls="profile" aria-selected="false">
                                <i class="fal fa-list"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-dos" data-toggle="tab" href="#dos" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>  
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-tres" data-toggle="tab" href="#tres" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>         
                    </ul>
                </div>
               
            `
        },
        vista_listado:()=>{
            return `
            <div class="card card-rounded col-12 shadow">
                <div class="card-body p-4 text-center">
                        <h1 class="text-secondary negrita">Pickings Asignados</h1>
                        <h3 class="negrita text-danger">${GlobalUsuario}</h3>
                </div>
            </div>
            <br>
            <div class="card card-rounded col-12">
                <div class="card-body p-1" id="tblEmbarques">
                    
                    
                </div>
            </div>
            `
        },
        vista_documentos:()=>{
            return `
            <div class="card card-rounded shadow col-12">
                <div class="card-body p-4">
                    <h5 class="negrita text-danger" id="lbEmbarque"></h5>
                    <div class="table-responsive">
                        <table class="table table-responsive col-12 table-striped table-bordered">
                            <thead class="bg-info text-white">
                                <tr>
                                    <td>FACTURA</td>
                                    <td>IMPORTE</td>
                                </tr>
                            </thead>
                            <tbody id="tblDocumentos"></tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
            <button class="btn btn-secondary btn-bottom-ml btn-xl btn-circle hand shadow" id="btnAtrasDocumentos">
                <i class="fal fa-arrow-left"></i>
            </button>
            `
        },
        vista_detalle:()=>{
            return `
            <div class="card card-rounded shadow">
                <div class="card-body p-4">
                    
                    
                </div>
            </div>
            <button class="btn btn-secondary btn-bottom-ml btn-xl btn-circle hand shadow" id="btnAtrasDetalle">
                <i class="fal fa-arrow-left"></i>
            </button>
            `
        }
    }

    root.innerHTML = view.body();

};

function addListeners(){

    document.getElementById('btnAtrasDocumentos').addEventListener('click',()=>{
        document.getElementById('tab-uno').click();
    });
    
    document.getElementById('btnAtrasDetalle').addEventListener('click',()=>{
        document.getElementById('tab-dos').click();
    });


    get_tbl_embarques_pendientes();


    funciones.slideAnimationTabs();
};

function initView(){

    getView();
    addListeners();

};



function get_data_embarques_pendientes(){

    return new Promise((resolve,reject)=>{
        console.log('intenta cargar...')

        axios.post('/repartidor/embarques_repartidor',{
            sucursal:GlobalCodSucursal,
            codrep:GlobalCodUsuario
         })
         .then((response) => {
             console.log('pasa por aqui...')
             let data = response.data;
             /*
             if(Number(data.rowsAffected[0])>0){
                 resolve(data);             
             }else{
                 reject();
             } */            
             if(response=='error'){reject()}else{resolve(data)}
         }, (error) => {
            console.log('error en solicitud')
            console.log(error);
             reject();
         });


    })

};

function get_tbl_embarques_pendientes(){

    let container = document.getElementById('tblEmbarques');
    container.innerHTML = GlobalLoader;

    get_data_embarques_pendientes()
    .then((data)=>{
        let str = ''; let strClassFinalizado = '';
        data.recordset.map((r)=>{
            if(r.FINALIZADO=='SI'){
                strClassFinalizado='border-danger bg-danger text-white'
            }else{
                strClassFinalizado='border-info'
            }
            str += `
            <div class="card card-rounded ${strClassFinalizado} col-12 hand shadow" onclick="get_data_embarque('${r.CODEMBARQUE}')">
                <div class="card-body p-4 text-center" id="">
                    <h5 class="negrita text-info">${r.RUTA}</h5>    
                    <h5>${r.CODEMBARQUE}</h5>
                    <label class="negrita text-danger">Fecha: ${funciones.convertDateNormal(r.FECHA)}</label>
                </div>
            </div>
            <br>
            `
        })
        container.innerHTML = str;
    })
    .catch(()=>{
        console.log('embarque no cargados')
        container.innerHTML = 'No hay datos...';
    })

}


function get_data_embarque(codembarque){

    document.getElementById('tab-dos').click();

    document.getElementById('lbEmbarque').innerText = codembarque;


    get_tbl_documentos_embarque(codembarque);


};

function get_data_documentos_embarque(codembarque){

    return new Promise((resolve,reject)=>{
        console.log('intenta cargar...')

        axios.post('/repartidor/embarque_documentos',{
            sucursal:GlobalCodSucursal,
            codembarque:codembarque
         })
         .then((response) => {
             console.log('pasa por aqui...')
             let data = response.data;
             /*
             if(Number(data.rowsAffected[0])>0){
                 resolve(data);             
             }else{
                 reject();
             } */            
             if(response=='error'){reject()}else{resolve(data)}
         }, (error) => {
            console.log('error en solicitud')
            console.log(error);
             reject();
         });


    })

};

function get_tbl_documentos_embarque(codembarque){

    let container = document.getElementById('tblDocumentos');
    container.innerHTML = GlobalLoader;


    get_data_documentos_embarque(codembarque)
    .then((data)=>{
        let str = '';
        data.recordset.map((r)=>{
            str += `
            <tr class="hand" onclick="get_detalle_factura('${r.CODDOC}','${r.CORRELATIVO}')">
                <td>
                    ${r.CLIENTE}
                    <br>
                    <small>${r.DIRECCION},${r.MUNICIPIO}</small>
                    <br>
                    <small class="text-danger">Fac:${r.CODDOC},${r.CORRELATIVO}</small>
                </td>
                <td>${funciones.setMoneda(r.IMPORTE,'Q')}</td>
            </tr>
            `
        })
        container.innerHTML = str;
    })
    .catch(()=>{
        container.innerHTML = 'No hay datos...';
    })
};


function get_detalle_factura(coddoc,correlativo){

    document.getElementById('tab-tres').click();




};


