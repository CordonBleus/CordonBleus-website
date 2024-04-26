import React, { useEffect, useState } from "react";
import axios from "axios";
import {LOGIN} from "../../constants/ConstantsAPI";
import { apiUser } from "../configs/axiosConfigs";

/**
 * Récupération d'une liste d'applications
 * @returns {Promise<*>}
 */

const controller = new AbortController();
export const USER_API ={
    updateApplicationsData : async  function (cancel =false,userLoGinData){
        try {
            const reponse = await apiUser.request({
                url:LOGIN,
                method: "POST",
                signal: controller.signal,
                headers:{
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'multipart/form-data'
                },
                data:{
                    username : userLoGinData.id,
                    email :userLoGinData.nom,
                    password:userLoGinData.version,
                }
            }).catch(function (error) {
                if (error.response) {
                    return error.status;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                    console.log(error.toJSON());
                }
            });
            return reponse.data
        }  catch (e) {
            console.log("La requette "+LOGIN+" a repondue avec le erreur = "+e);
        }
    },
}