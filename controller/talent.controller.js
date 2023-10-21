const { Talent } = require('../models/talent.model');
const cloudinary = require('../lib/cloudinary');


// Get all Talent
const getAllTalents =  async (req , res) =>{
  // query with page limit 
  const {page = 1, limit = 10} = req.query;
    
  const getAllTalents = await Talent.find()
  .limit(limit * 1)
  .skip((page - 1 ) * limit)
  .exec();
  //Get Total documents in blogPost collection
const count = await Talent.countDocuments();
res.json({getAllTalents, totalPages:Math.ceil(count / limit), currentPage: page})
}

// Create Talents
const createTalents = async (req, res) =>{
   cloudinary.uploader.upload(req.file.path,
      {
      resource_type: "video",
      folder: "video",
      },
      (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).send(err);
      }
      const newUpload = Talent.create({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         summarize: req.body.summarize,
         file: result.secure_url,
       });
       console.log(newUpload)
       return res.status(201).json({ message:"Talent Successfully Created" });
  }
  );

}


// Get Talent By Id
const getByIdTalents =  async (req , res) =>{
 const getById = await Talent.findById(req.params.id)
 if(!getById){
    return res.status(400).send({message:'Talent Not Found'})
 } 
 const getTalentById = await Talent.findById(getById);
 return res.status(200).json({getTalentById})
}


// Delete Talents
const deleteTalents = async (req , res) =>{
const getById = await Talent.findById(req.params.id);
if(!getById){
    return res.status(400).send({message:'Talent Not Found'})
 } 
 const deleteTalent = await Talent.findByIdAndDelete(getById)
 return res.status(200).json({deleteTalent})
}


module.exports = {getAllTalents ,createTalents , getByIdTalents, deleteTalents }

