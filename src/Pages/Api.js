import axios from "axios";

// const baseurl = `http://172.16.17.2:8080/ords/market/tbl/`
const baseurl = `http://103.21.232.59:8080/ords/market/tbl/`

const siriM1 = 'http://172.16.17.2:8080/ords/m1/tbl/'
// const siriM1 = 'http://103.21.232.59:8080/ords/m1/tbl/'

const documentsUploadBaseUrl = `http://172.16.17.10:4666/api/Photo/`
// const documentsUploadBaseUrl = `http://103.21.232.59:4666/api/Photo/`
export const officerApi = {
    officerApi_master(url = baseurl + `officers`) {
        return {
            fetchAll: () => axios.get(url),
            create: (newrecord) => axios.post(url, newrecord),
            update: (id, newrecord) => axios.put(url + `?officer_code=${id}`, newrecord)
        }
    }
}

export const customerApi = {
    customerMaster(url = baseurl + 'customer') {
        return {
            FetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, newRecord) => axios.put(url + `?customer_code=${id}`, newRecord),
            fetch_OfficerName_DD: () => axios.get(baseurl + 'dd_officer_name'),
            fetch_relationType_DD: () => axios.get(baseurl + "relation"),
            fetch_status_DD: () => axios.get(baseurl + 'agent_status'),
            fetch_customerType_DD: () => axios.get(baseurl + 'customer_type'),
            fetch_RateCateogry_DD: () => axios.get(baseurl + 'rate_category'),
            fetch_BillCategory_DD: () => axios.get(baseurl + 'bill_category'),
            fetch_Paymode_DD: () => axios.get(baseurl + 'dd_paymode'),
            fetch_BankMaster_DD: () => axios.get(baseurl + 'dd_bank_master'),
            fetch_BranchMaster_DD: (id) => axios.get(baseurl + `dd_branchmaster?bank_code=${id}`),
            fetch_ifcs: (id) => axios.get(baseurl + `get_ifsc_from_branch?branch_code=${id}`),

            //gst details popup 
            fetchGSTDetails: (id) => axios.get(baseurl + `gst_details?customer_code=${id}`),
            addGstDetails: (newRecord) => axios.post(baseurl + "gst_details", newRecord),
            UpdateGSTDetails: (id, updatedRecord) => axios.put(baseurl + `gst_details?gst_id=${id}`, updatedRecord),
            gstStatusCheck: (id) => axios.get(baseurl + `get_gst_status_check?customer_code=${id}`),
            gstCancleDate: (id) => axios.get(baseurl + `get_maxgst_cancelationdate?customer_code=${id}`),

            //deposit details popup 
            FetchDepositeDetails: (id) => axios.get(baseurl + `customer_deposit?customer_code=${id}`),
            AddDeposit: (newRecord) => axios.post(baseurl + 'customer_deposit', newRecord),
            updateDepositeDetails: (id, newRecord) => axios.put(baseurl + `customer_deposit?deposit_id=${id}`, newRecord),
            fetch_DepositePaymode_DD: () => axios.get(baseurl + 'dd_deposit_paymode'),
            fetch_DepositeType_DD: () => axios.get(baseurl + 'dd_deposit_type'),
            // bankDetailsUpdate: (id, updatedRecord) => axios.put(url + `?customer_code=${id}`, updatedRecord),

            //address details popup
            addressFetchAll: (id) => axios.get(baseurl + `address?customer_code=${id}`),
            addAddress: (newRecord) => axios.post(baseurl + "address", newRecord),
            AddressUpdate: (id, newRecord) => axios.put(baseurl + `address?address_id=${id}`, newRecord),
            DD_fetch_cityName: () => axios.get(baseurl + "dd_city"),
            DD_fetch_TalukaName: () => axios.get(baseurl + "dd_taluka"),
            DD_fetch_DistrictName: () => axios.get(baseurl + "district"),

            //search 
            dd_UserCode: () => axios.get(baseurl + `dd_cust_customer_code`),
            dd_CustomerName: () => axios.get(baseurl + `dd_cust_customer_name`),
            fetchByCustomerCode: (id) => axios.get(url + `?customer_code=${id}`)
        }
    }
}


export const RelationApi = {
    RelationApi_master(url = baseurl + "relation") {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?rel_type_id=${id}`, updateRecord),
        }
    }
}
export const paymode_Api = {
    paymode(url = baseurl + 'paymode') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?pay_id=${id}`, updateRecord),
        }
    }
}
export const StatusApi = {
    Status_master(url = baseurl + 'agent_status') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + `?status_id=${id}`),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?status_id=${id}`, updateRecord),
        };
    }
};

export const billCategoryApi = {
    BillCategory_Master(url = baseurl + "bill_category") {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, newRecord) => axios.put(url + `?bill_catag=${id}`, newRecord)
        }
    }
}
export const RateCategoryApi = {
    RateCategory(url = baseurl + 'rate_category') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?catag_code=${id}`, updateRecord),
        };
    }
};

export const CustomerTypeApi = {
    CustomerTypeApi_master(url = baseurl + 'customer_type') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?customer_type_id=${id}`, updateRecord),
        };
    }
};
export const BankMasterApi = {
    bankmaster(url = baseurl + 'bankmaster') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + `?bank_code=${id}`),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?bank_code=${id}`, updateRecord),
            delete: id => axios.delete(url + `?bank_code=${id}`)
        };
    }
};

export const BranchMasterApi = {
    BranchMaster(url = baseurl + 'branchmaster') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + `?branch_code=${id}`),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?branch_code=${id}`, updateRecord),
            delete: deletedBranch => axios.delete(url + `?branch_code=${deletedBranch}`),

            //search
            fetchByBack_code: banck_code => axios.get(url + `?bank_code=${banck_code}`)
        };
    }
};

export const DistrictAPI = {
    DistrictAPI_master(url = baseurl + 'district') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?district_code=${id}`, updateRecord),
        };
    }
};

export const TalukaAPI = {
    TalukaAPI_master(url = baseurl + 'taluka') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?taluka_code=${id}`, updateRecord),
            fetchDistrictNameDD: () => axios.get(baseurl + `district`)
        };
    }
};
export const CityAPI = {
    CityAPI_master(url = baseurl + 'city') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?city_code=${id}`, updateRecord),
            fetchTalukaName: () => axios.get(baseurl + "taluka")
        };
    }
};

export const DistributionBatchAPI = {
    DistributionBatch_master(url = baseurl + 'dist_batch') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?dist_batch_no=${id}`, updateRecord),
        };
    }
};

export const sign_up_Api = {
    user_mast(url = baseurl + 'user_mast') {
        return {
            create: newRecord => axios.post(url, newRecord),
        };
    }
};

export const sign_in_Api = {
    sign_in(url = baseurl + 'signin') {
        return {
            fetchby_login_id: loginId => axios.get(url + `?login_id=${loginId}`),
            fetchById: id => axios.get(url + `?branch_code=${id}`),
        };
    }
};

// not used for future
export const ContractorTypeApi = {
    ContractorTypeApi_master(url = baseurl + 'contractor_type') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?customer_type_id=${id}`, updateRecord),
        };
    }
};

export const ContractorAPi = {
    ContractorAPi_master(url = baseurl + 'contractor') {
        return {
            //contracator master
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?contractor_code=${id}`, updateRecord),
            fetch_BankMaster_DD: () => axios.get(baseurl + 'dd_bank_master'),
            fetch_BranchMaster_DD: (id) => axios.get(baseurl + `dd_branchmaster?bank_code=${id}`),
            fetch_ifcs: (id) => axios.get(baseurl + `get_ifsc_from_branch?branch_code=${id}`),

            //contracator details
            contractDetailsCreate: (newRecord) => axios.post(baseurl + 'contractor_detail', newRecord),
            updateContrcatDetails: (id, newRecord) => axios.put(baseurl + `contractor_detail?cont_det_code=${id}`, newRecord),
            DD_contractor_details_route_name: () => axios.get(baseurl + 'dd_contractor_detail_route_name'),

            //contracator details popup
            fetchContrcatorDeposite: (id) => axios.get(baseurl + `contractor_deposit?contractor_code=${id}`),
            postContractorDetails: (newRecord) => axios.post(baseurl + "contractor_deposit", newRecord),
            updateContractorDetails: (id, newRecord) => axios.put(baseurl + `contractor_deposit?deposit_id=${id}`, newRecord),
            DD_route_name_form_Contrcator_code: (id) => axios.get(baseurl + `dd_contractor_deposit_route_name?contractor_code=${id}`),
            fetch_DepositePaymode_DD: () => axios.get(baseurl + 'dd_deposit_paymode'),
            fetch_DepositeType_DD: () => axios.get(baseurl + 'dd_deposit_type'),

            //search
            DD_contractor_code: () => axios.get(baseurl + `dd_contrac_contractor_code`),
            DD_contractor_name: () => axios.get(baseurl + `dd_contrac_contractor_name`),
            fetchById: (id) => axios.get(url + `?contractor_code=${id}`),

        };
    }
};

export const DistrubutionRoutesAPI = {
    DistrubutionRoutesAPI_master(url = baseurl + 'dist_routes') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?route_code=${id}`, updateRecord),

            DD_fetch_district_batch_name: () => axios.get(baseurl + 'dd_dist_batch_name'),
            DD_fetch_contractorCodeNames: () => axios.get(baseurl + 'dd_contractor_name')
        };
    }
};

export const ProductsApi = {
    ProductsApi_master(url = baseurl + "products") {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?product_code=${id}`, updateRecord),
            dd_ProductSuplier: () => axios.get(baseurl + 'dd_product_supplier'),
            //search
            dd_UsersCode: () => axios.get(baseurl + `dd_prd_product_code`),
            dd_ProductName: () => axios.get(baseurl + `dd_prd_product_name`),
            fetchByProductCode: (id) => axios.get(url + `?product_code=${id}`)
        }
    }
}

export const PacketsUnitsAPi = {
    PacketsUnitsAPi_master(url = baseurl + 'pkt_units') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?unit_id=${id}`, updateRecord),
            DD_gst_units: () => axios.get(baseurl + 'dd_get_gst_units'),
        }
    }
}

export const CustomerRouteApi = {
    PacketsUnitsAPi_master(url = baseurl + 'customer_route') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?cust_route_id=${id}`, updateRecord),
            fetchbyId: (id) => axios.get(url + `cust_route_id=${id}`),
            dd_fetch_distribution_batch_name: () => axios.get(baseurl + 'dd_dist_batch_name'),
            dd_RouteNames: (id) => axios.get(baseurl + `dd_get_route_name_by_dist_batch_no?dist_batch_no=${id}`),
            dd_CustomerName: () => axios.get(baseurl + `dd_cust_customer_name`), // Common for both dd & search

            //search
            dd_searchRoute: () => axios.get(baseurl + 'dd_contractor_detail_route_name'),
            searchRouteName: (id) => axios.get(baseurl + `search_cust_route_routename?route_code=${id}`),
            searchCustomerName: (id) => axios.get(baseurl + `search_cust_route_custname?customer_code=${id}`),
            //app indent route checkbox
            indentRouteValidation: (distrubutionBatchCode, customerCode) => axios.get(baseurl + `cust_route_AppIndentRoute_status?dist_batch_no=${distrubutionBatchCode}&customer_code=${customerCode}`),
            indetupdate: (id, record) => axios.put(baseurl + `cust_route_AppIndentRoute_status?cust_route_id=${id}`, record),
            //bill route checkbox
            billRouteValidation: (customerCode) => axios.get(baseurl + `cust_route_BillRoute_status?customer_code=${customerCode}`),
            billupadte: (id, record) => axios.put(baseurl + `cust_route_BillRoute_status?cust_route_id=${id}`, record)
        }
    }
}

export const PacketsApi = {
    PacketsAPI_master(url = baseurl + 'packets') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?packet_code=${id}`, updateRecord),

            DD_fetch_product_name: () => axios.get(baseurl + 'dd_prd_product_name'),
            DD_fetch_unit_name: () => axios.get(baseurl + 'dd_packet_unit_name'),
            DD_fetch_category_name: () => axios.get(baseurl + 'dd_category_name'),

            //search
            DD_UsersCode: () => axios.get(baseurl + `dd_pkt_packet_code`),
            DD_PacketName: () => axios.get(baseurl + `dd_pkt_packet_name`),
            fetchByPacketCode: (id) => axios.get(url + `?packet_code=${id}`),

            //FOR PACKET IMAGES after save
            fetchAllImages: (packetCode) => axios.get(baseurl + `pkt_images?packet_code=${packetCode}`), //pkt_images?packet_code=1
            fetchByMasterID: () => axios.get(baseurl + `doc_master_link_pkt?master_id=${3}`),
            create_pkt_images: newRecord => axios.post(baseurl + `pkt_images`, newRecord),
            postWebApiDocuments: (newRecord) => axios.post(documentsUploadBaseUrl + "SaveFileLocally", newRecord),
            getDocumentsWebApi: (fileName) => axios.get(documentsUploadBaseUrl + `get1/${fileName}`),
            typeCheckDocuments: (id) => axios.get(baseurl + `dd_pkt_images_upload_file_typeCheck?doc_id=${id}`),
            deleteImageWebApi: (FileName) => axios.delete(documentsUploadBaseUrl + `delete/${FileName}`),
            deleteOracle: (fileName) => axios.delete(baseurl + `pkt_images?img_name=${fileName}`)
        };
    }
};

export const DocumentMasterLinkApi = {
    DocumentMasterLinkApi_Master(url = baseurl + 'doc_master_link') {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, newRecord) => axios.put(url + `?link_id=${id}`, newRecord),
            delete: id => axios.delete(url + `?link_id=${id}`),

            DD_fetch_masterName: () => axios.get(baseurl + 'dd_doc_master_masterName'),
            DD_fetch_documentName: () => axios.get(baseurl + 'dd_doc_master_documentName'),
            //search
            fetchByMasterId: (id) => axios.get(baseurl + `search_docMasterLink_masterName?master_id=${id}`)
        }
    }
}

export const DocumentMasterApi = {
    DocumentMasterApi_Master(url = baseurl + 'doc_master') {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, newRecord) => axios.put(url + `?doc_id=${id}`, newRecord)
        }
    }
}
export const IndentEntryAPI = {
    IndentEntryAPI_master(url = baseurl + 'indent_entry') {
        return {
            DD_fetch_district_batch_name: () => axios.get(siriM1 + 'dd_dist_batch_name'),
            // DD_fetch_customer_name:()=>axios.get(baseurl +`dd_indent_entry_customer`),
            DD_fetch_customer_name: (id) => axios.get(siriM1 + `dd_indent_entry_customer_name?dist_batch_no=${id}`),
            DD_fetch_route_name: (distbatchNo, CustomerCode) => axios.get(siriM1 + `dd_indent_entry_route_name?dist_batch_no=${distbatchNo}&customer_code=${CustomerCode}`),
            getGridRows: (indentNumber) => axios.get(siriM1 + `get_gridRows_for_indentEntry?indent_number=${indentNumber}`)
        };
    }
};

export const fileTypesApi = {
    fileTypesApi_Master(url = baseurl + 'file_types') {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, newRecord) => axios.put(url + `?ft_id=${id}`, newRecord)
        }
    }
}

export const fileTypesAllowedApi = {
    fileTypesAllowedApi_Master(url = baseurl + 'file_types_allowed') {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, newRecord) => axios.put(url + `?type_id=${id}`, newRecord),
            delete: id => axios.delete(url + `?type_id=${id}`),

            DD_fetch_documentName: () => axios.get(baseurl + 'dd_doc_master_documentName'),
            DD_fetch_file_typeName: () => axios.get(baseurl + 'dd_file_type_fileTypeName'),
        }
    }
}