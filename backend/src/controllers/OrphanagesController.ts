import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {
   async show(req: Request, res: Response){
     
        const { id } = req.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.findOneOrFail(id, { relations:['images']});
        return res.json(OrphanageView.render(orphanages));
   },

   async index(req: Request, res: Response){
   const orphanagesRepository = getRepository(Orphanage);
   const orphanages = await orphanagesRepository.find({ relations:['images']});
   return res.json(OrphanageView.renderMany(orphanages));
   },


    async create(req: Request, res: Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends} = req.body;


        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image=>{
            return {path: image.filename}
        })

            const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
            };
            
            const orphanagesRepository = getRepository(Orphanage);
            const schema = Yup.object().shape({
            name:Yup.string().required("Nome é obrigatório"),
            latitude:Yup.number().required("Latitude é obrigatório"),
            longitude:Yup.number().required("Longitude é obrigatório"),
            about:Yup.string().required("O campo Sobre é obrigatório").max(308),
            instructions:Yup.string().required("O campo Instruções é obrigatório"),
            opening_hours:Yup.string().required("Horario de funcionamento é obrigatório"),
            open_on_weekends:Yup.boolean().required("Campo de funcionamento aos finais de semana é obrigatório"),
            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required()
            })
            )
            })


            await schema.validate(data,{
                abortEarly:false,
            });

            const orphanage = orphanagesRepository.create(data)
        
            await orphanagesRepository.save(orphanage);
        
            return res.status(201).json(orphanage)
    }
}