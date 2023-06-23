const mysql = require('mysql');
const axios = require("axios");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
const session=require('express-session');
const { google } = require('googleapis')
const wbm = require('wbm');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const uuidv1 = require('uuidv1');
const { gmail } = require('googleapis/build/src/apis/gmail');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// const db = mysql.createConnection({
//     host: process.env.Database_host,
//     user: process.env.Database_user,
//     password: process.env.Database_password,
//     database: process.env.Database
// });

var db = mysql.createConnection(
    {host: "webapp-demo.mysql.database.azure.com", 
    user: "optumcure@webapp-demo", 
    password: "Test@1234", 
    database: "webapp-demo", port: 3306}
    );


let mailOptions ={
    from:'optumcure@gmail.com',
    to:'rudranshj95@gmail.com',
    subject: 'A reminder from Optum-Cure',
    text:'It is a healthy reminder to take your medicine'
};

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'optumcure@gmail.com',
        pass:'Test1234'
    }
});

cron.schedule('0 9 * * *',()=>{
    console.log('Cronjob working...')
    let system_date = formatDate(new Date().toDateString())
    db.query('select patient_id as patid, prescription_id as presid from prescriptions where prescription_start<=? AND prescription_end>=?',[system_date,system_date],(err,res)=>{
        if(err)
        {
            console.log(err)
        }else{
            console.log(res);
            //console.log(res[0].patid);
            let length = res.length
            console.log('length: ',length);
            for(var i = 0; i < length; i ++){
                var patient_id = res[i].patid
                var prescription_id = res[i].presid
                db.query('SELECT email as mail from  patient where patient_id=?',[patient_id],(err1,res1)=>{
                    if(err1)
                    {
                        console.log(err1)
                    }else{
                        var email = res1[0].mail;
                        console.log(email);
                        db.query('SELECT medicine as medList from medicines where prescription_id=? and breakfast=?',[prescription_id,1],(err3,res3)=>{
                            if(err3)
                            {
                                console.log(err3)
                            }else{
                                //console.log(res3);
                                let newMedList = []
                                res3.forEach((elem)=>{
                                    newMedList.push(elem.medList)
                                })

                                console.log(res3[0].medList);
                                mailOptions.to = email
                                mailOptions.text = `It is an healthy reminder to take your medicine ${newMedList}`
                                transporter.sendMail(mailOptions,(error,info)=>{
                                    if(error)
                                    {
                                        console.log(error)
                                    }else{
                                        console.log('Email sent!')
                                    }
                                })
                            }
                        })
                    }
                })
            }

            // res.patid.forEach(aFunction)
            
            // function aFunction(item)
            // {
            //     db.query('SELECT email from patient where patient_id=?',[item],(er,re)=>{
                    
            //     })
            // }
        }
    })
  

})

cron.schedule('0 15 * * *',()=>{
    console.log('Cornjob working...')
    let system_date = formatDate(new Date().toDateString())
    db.query('select patient_id as patid, prescription_id as presid from prescriptions where prescription_start<=? AND prescription_end>=?',[system_date,system_date],(err,res)=>{
        if(err)
        {
            console.log(err)
        }else{
            console.log(res);
            //console.log(res[0].patid);
            let length = res.length
            console.log('length: ',length);
            for(var i = 0; i < length; i ++){
                var patient_id = res[i].patid
                var prescription_id = res[i].presid
                db.query('SELECT email as mail from  patient where patient_id=?',[patient_id],(err1,res1)=>{
                    if(err1)
                    {
                        console.log(err1)
                    }else{
                        var email = res1[0].mail;
                        console.log(email);
                        db.query('SELECT medicine as medList from medicines where prescription_id=? and lunch=?',[prescription_id,1],(err3,res3)=>{
                            if(err3)
                            {
                                console.log(err3)
                            }else{
                                //console.log(res3);
                                let newMedList = []
                                res3.forEach((elem)=>{
                                    newMedList.push(elem.medList)
                                })

                                console.log(res3[0].medList);
                                mailOptions.to = email
                                mailOptions.text = `It is an healthy reminder to take your medicine ${newMedList}`
                                transporter.sendMail(mailOptions,(error,info)=>{
                                    if(error)
                                    {
                                        console.log(error)
                                    }else{
                                        console.log('Email sent!')
                                    }
                                })
                            }
                        })
                    }
                })
            }

            // res.patid.forEach(aFunction)
            
            // function aFunction(item)
            // {
            //     db.query('SELECT email from patient where patient_id=?',[item],(er,re)=>{
                    
            //     })
            // }
        }
    })
  

})

cron.schedule('0 21 * * *',()=>{
    console.log('Cronjob working...')
    let system_date = formatDate(new Date().toDateString())
    db.query('select patient_id as patid, prescription_id as presid from prescriptions where prescription_start<=? AND prescription_end>=?',[system_date,system_date],(err,res)=>{
        if(err)
        {
            console.log(err)
        }else{
            console.log(res);
            //console.log(res[0].patid);
            let length = res.length
            console.log('length: ',length);
            for(var i = 0; i < length; i ++){
                var patient_id = res[i].patid
                var prescription_id = res[i].presid
                db.query('SELECT email as mail from  patient where patient_id=?',[patient_id],(err1,res1)=>{
                    if(err1)
                    {
                        console.log(err1)
                    }else{
                        var email = res1[0].mail;
                        console.log(email);
                        db.query('SELECT medicine as medList from medicines where prescription_id=? and dinner=?',[prescription_id,1],(err3,res3)=>{
                            if(err3)
                            {
                                console.log(err3)
                            }else{
                                //console.log(res3);
                                let newMedList = []
                                res3.forEach((elem)=>{
                                    newMedList.push(elem.medList)
                                })

                                console.log(res3[0].medList);
                                mailOptions.to = email
                                mailOptions.text = `It is an healthy reminder to take your medicine ${newMedList}`
                                transporter.sendMail(mailOptions,(error,info)=>{
                                    if(error)
                                    {
                                        console.log(error)
                                    }else{
                                        console.log('Email sent!')
                                    }
                                })
                            }
                        })
                    }
                })
            }

        
        }
    })
  

})








var patientSess;

//for Patient login
exports.afterLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        db.query('Select * FROM patient_login WHERE email= ?', [email], async (error, results) => {
            if(error){
                console.log(error);
            }
            // console.log(results);
            // if (!results || !(await bcrypt.compare(password, results[0].password))) {
            //     res.status(400).render('patientLogin', {
            //         message: 'Email or password is incorrect!',
            //         messageClass:'alert-warning'
            //     });
            // }

            else {
                //creating session
                db.query('select * from patient where email=?',[email],(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }else{
                        
                        sess=req.session;
                        sess.patient={};
                        sess.patient.city=result[0].city;
                        sess.patient.name=result[0].first_name;
                        sess.patient.ids=result[0].patient_id;

                        
                       // console.log(sess.patient);
                        patientSess=Object.assign(sess.patient);
                        
                       // console.log(patientSess);
                
                    }
                });
                // console.log(sess.city);
                
                //session


                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("Token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/searchDoctors");
            }
        })

    } catch (error) {
        console.log(error);
    }
}


var doctorSess;
exports.doctorHome = async (req, res) => {
   
    try {
        const { email, password } = req.body;
      

        db.query('Select * FROM doctor WHERE email= ?', [email], async (error, results) => {
            if(error){
                console.log(error);
            }
           // console.log(results);
            // if (!results || !( await bcrypt.compare(password, results[0].password))) {
            //     res.status(400).render('doctorLogin', {
            //         message: 'Email or password is incorrect!',
            //         messageClass:'alert-warning'
            //     });
            // }

            else {
                //creating session
                db.query('select * from doctor where email=?',[email],(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }else{
                        
                        sess=req.session;
                        console.log(sess);
                        sess.doc={};
                        //sess.doc.city=result[0].city;
                        sess.doc.clinic=result[0].clinic_id;
                        sess.doc.idss=result[0].doctor_id;
                        sess.doc.name=result[0].first_name;

                        
                       // console.log(sess.patient);
                        doctorSess=Object.assign(sess.doc);
                        
                        console.log(doctorSess);
                
                    }
                });

                
                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("Token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);

                //query for retreiving bookings for doctor
                // db.query('SELECT * FROM ((SELECT booking_id,patient_id,appointment_type, DATE_FORMAT(appointment_Dtime,"%Y-%m-%d %T") appointment_Dtime FROM booking WHERE doctor_id = ?) filtered_booking) LEFT JOIN ((SELECT * FROM ((SELECT patient_id, first_name, last_name, age, email FROM patient) filtered_patient) LEFT JOIN ((SELECT patient_id,contact_number contact_no FROM patient_contact group by patient_id) filtered_patient_contact) USING (patient_id)) filtered_patient_join) USING (patient_id)', [doctorSess.idss], (err, result) => {
        
                //     console.log(result);
            
                //     if (err) {
                //         console.log(err);
                //     }
            
                //     if (result.length === 0) {
                //         return res.render('viewBookingsDoc', {
                //             message: 'No Bookings Found',
                //             messageClass:'alert-warning'
                //         });
                //     }
                //     else{
                //         //res.status(200).redirect("/viewBookingsDoc",{bookingDetails:JSON.stringify(result)});
                //         return res.render('viewBookingsDoc',{bookingDetails:JSON.stringify(result)});
                //     }
                // });
                return res.render('doctorHome',{doctorDetails:JSON.stringify(doctorSess)});
                //below line needs to be deleted
                //res.status(200).redirect("/viewBookingsDoc");
            }
        })

    } catch (error) {
        console.log(error);
    }
}






//afterDrLogin
//var doctorSess;
// exports.viewBookingsDoc = async (req, res) => {
   
//     try {
//         const { email, password } = req.body;
      

//         db.query('Select * FROM doctor_login WHERE email= ?', [email], async (error, results) => {
//             if(error){
//                 console.log(error);
//             }
//            // console.log(results);
//             // if (!results || !( await bcrypt.compare(password, results[0].password))) {
//             //     res.status(400).render('doctorLogin', {
//             //         message: 'Email or password is incorrect!',
//             //         messageClass:'alert-warning'
//             //     });
//             // }

//             else {
//                 //creating session
//                 db.query('select * from doctor where email=?',[email],(err,result)=>{
//                     if(err)
//                     {
//                         console.log(err);
//                     }else{
                        
//                         sess=req.session;
//                         console.log(sess);
//                         sess.doc={};
//                         //sess.doc.city=result[0].city;
//                         sess.doc.clinic=result[0].clinic_id;
//                         sess.doc.idss=result[0].doctor_id;

                        
//                        // console.log(sess.patient);
//                         doctorSess=Object.assign(sess.doc);
                        
//                         console.log(doctorSess);
                
//                     }
//                 });

                
//                 const id = results[0].id;
//                 const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//                     expiresIn: process.env.JWT_EXPIRES_IN
//                 });
//                 console.log("Token is: " + token);

//                 const cookieOptions = {
//                     expires: new Date(
//                         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//                     ),
//                     httpOnly: true
//                 }
//                 res.cookie('jwt', token, cookieOptions);

//                 //query for retreiving bookings for doctor
//                 db.query('SELECT * FROM ((SELECT booking_id,patient_id,appointment_type, DATE_FORMAT(appointment_Dtime,"%Y-%m-%d %T") appointment_Dtime FROM booking WHERE doctor_id = ?) filtered_booking) LEFT JOIN ((SELECT * FROM ((SELECT patient_id, first_name, last_name, age, email FROM patient) filtered_patient) LEFT JOIN ((SELECT patient_id,contact_number contact_no FROM patient_contact group by patient_id) filtered_patient_contact) USING (patient_id)) filtered_patient_join) USING (patient_id)', [doctorSess.idss], (err, result) => {
        
//                     console.log(result);
            
//                     if (err) {
//                         console.log(err);
//                     }
            
//                     if (result.length === 0) {
//                         return res.render('viewBookingsDoc', {
//                             message: 'No Bookings Found',
//                             messageClass:'alert-warning'
//                         });
//                     }
//                     else{
//                         //res.status(200).redirect("/viewBookingsDoc",{bookingDetails:JSON.stringify(result)});
//                         return res.render('viewBookingsDoc',{bookingDetails:JSON.stringify(result)});
//                     }
//                 });
//                 //below line needs to be deleted
//                 //res.status(200).redirect("/viewBookingsDoc");
//             }
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }


exports.viewBookingsDoc = async (req, res) => {
   
    try {
      
                //query for retreiving bookings for doctor
                db.query(' SELECT * FROM ((SELECT booking_id,patient_id,appointment_type, DATE_FORMAT(appointment_Dtime,"%Y-%m-%d %T") appointment_Dtime FROM booking WHERE doctor_id =?) filtered_booking) LEFT JOIN ((SELECT patient_id, first_name, last_name, age, email FROM patient) filtered_patient) ON filtered_booking.patient_id = filtered_patient.patient_id', [doctorSess.idss], (err, result) => {
                

                    console.log(result);
           
                    if (err) {
                        console.log(err);
                    }
            
                    if (result.length === 0) {
                        return res.render('viewBookingsDoc', {
                            message: 'No Bookings Found',
                            messageClass:'alert-warning'
                        });
                    }
                    else{
                        //res.status(200).redirect("/viewBookingsDoc",{bookingDetails:JSON.stringify(result)});
                        return res.render('viewBookingsDoc',{bookingDetails:JSON.stringify(result)});
                    }
                });
                //below line needs to be deleted
                //res.status(200).redirect("/viewBookingsDoc");
            
        

    } catch (error) {
        console.log(error);
    }
}



exports.viewBookingsPat = (req,res) => {
    // console.log(req.body);

    // const { name, email, contact, plot, landmark, street, city } = req.body;

    db.query('SELECT DATE_FORMAT(appointment_Dtime,"%Y-%m-%d %T") appointment_Dtime,appointment_type,booking_id,booking.doctor_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city from booking left join (SELECT doctor_id,clinic_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city FROM doctor JOIN clinic using (clinic_id) where city=?) as doc_clinic on booking.doctor_id=doc_clinic.doctor_id where booking.patient_id = ?', [patientSess.city,patientSess.ids], (error, results) => {
        
        // console.log(results);

        if (error) {
            console.log(error);
        }

        if (results.length === 0) {
            return res.render('viewBookingsPat', {
                message: 'No Bookings Found',
                messageClass:'alert-warning'
            });
        }
        else{
            return res.render('viewBookingsPat',{bookingDetails:JSON.stringify(results)});
        }
    });
}


exports.cancelBookingsPat = (req,res) => {
    // console.log(req.body);
    const {booking_id}=req.body;
    // console.log(req.body);

    db.query('Select doctor_id as docId from booking where booking_id= ?', [booking_id], (error12, results12) => {
        if (error12) {
            console.log(error12);
        } else {
            db.query('SELECT email as docMailIdF from doctor where doctor_id=?',[results12[0].docId],(error33,result33)=>{

           
            console.log(result33[0].docMailIdF)
            console.log(patientSess.name)
                         
                            let mailTransporter = nodemailer.createTransport({
                                service: 'yahoo',
                                auth: {
                                    user: 'noreplyuhgoptum@yahoo.com',
                                    pass: 'noreplywebapp'
                                }
                            });
                            let mailDetails = {
                                from: 'noreplyuhgoptum@yahoo.com',
                                to: 'rudranshj95@gmail.com',
                                subject: 'Appointment Cancelled',
                                text: `Appointment with the  patient has been cancelled!`
                            };
                        
                            mailTransporter.sendMail(mailDetails, function(err, data) {
                                if(err) {
                                    console.log('Error Occurs');
                                } else {
                                    console.log('Email sent successfully');
                                }
                            });              
              
            
                        })
            

        }
    });




    

  
    db.query('DELETE from booking where booking_id=?',[booking_id],(errors,result)=>{
        if(errors){
            console.log(errors);
        }
    else{

    db.query('SELECT appointment_Dtime,appointment_type,booking_id,booking.doctor_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city from booking left join (SELECT doctor_id,clinic_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city FROM doctor JOIN clinic using (clinic_id) where city=?) as doc_clinic on booking.doctor_id=doc_clinic.doctor_id where booking.patient_id = ?', [patientSess.city,patientSess.ids], (error, results) => {
        
        // console.log(results);

        if (error) {
            console.log(error);
        }

        if (results.length === 0) {
            return res.render('viewBookingsPat', {
                message: 'No Bookings Found',
                messageClass:'alert-warning'
            });
        }
        else{
            return res.render('viewBookingsPat',{bookingDetails:JSON.stringify(results)});
        }
    });
    }
});
}



//function for patient registration
exports.patientSignup = (req, res) => {
    console.log(req.body);

    const { fname, lname, email, age, password, contact, altContact, house, street, city } = req.body;

    db.query('SELECT email from patient_login where email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }


        if (results.length > 0) {
            return res.render('patientSignup', {
                message: 'The email is already in use',
                messageClass:'alert-warning'
            });
        }


        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);


        db.query('INSERT INTO patient_login SET ?', { email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);

            }
        });


        db.query('INSERT INTO patient SET ?', { first_name: fname, last_name: lname, email: email, age: age, house_number: house, street: street, city: city }, (error, results) => {
            if (error) {
                console.log(error);
            } else {

        db.query('select max(patient_id) lastPatient from patient',(err,resu)=>{

                db.query('INSERT INTO patient_contact SET ?',{patient_id:resu[0].lastPatient,contact_number:contact},(error,results)=>{
                    if(error)
                    {
                        console.log(error);
                    }else{
                            console.log(results);
        
                    }
                });

                //For alternate contact number
                db.query('INSERT INTO patient_contact SET ?',{patient_id:resu[0].lastPatient,contact_number:altContact},(error,results)=>{
                    if(error)
                    {
                        console.log(error);
                    }else{
                            console.log(results);
        
                    }
                });

            });

                return res.render('patientLogin', {
                    message: 'User Registered!',
                    messageClass:'alert-primary'
                });
            }

        });

        



    });

    // res.send("Form Submitted");
}

//Wen patient selects specialization
//Needed doctor- doctor name,cnsultationcharges,full name,degree,specialization
//Needed clinic-,clinic name and full address

exports.addPrescription = (req,res)=>{
    return res.render('addPrescription')
}

exports.addingPrescription =  (req,res) =>{
    console.log("hi, adding prescription")
    var presId = 0;
    // console.log("reqbody below");
     console.log(req.body);
    const {operations,medicines,form_elements} = req.body;

    //retreiving patient emailid
    var patEmail = 'rj@gmail.com'
    db.query('SELECT email as em from patient where patient_id=?',[form_elements.patientid], (err,res)=>{
        if(err)
        {
            console.log(err)
        }else{
            patEmail = res[0].em;
            
        }
    });
   

    db.query('INSERT into prescriptions set ?',{doctor_id:doctorSess.idss,patient_id:form_elements.patientid,prescription_start:form_elements.sdate,prescription_end:form_elements.edate,symptoms:form_elements.symptoms},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("inserted into presciptions table")

        }
    });


    operations.forEach(myFunction);
     function myFunction(item)
     {
        // console.log(typeof(item));
         db.query('Insert into operations set ?',{patient_id:form_elements.patientid,doctor_id:doctorSess.idss,operation_desc:item.name},(e,r)=>{
             if(e){
                 console.log(e);
             }else{
                 console.log("Inserted into operations table");
             }
         });
     }

     db.query('select max(prescription_id) as maxId from prescriptions',(error,result)=>{
        console.log(result);
        if(error){
            console.log(error);
        }else{
           presId = result[0].maxId;
           console.log('prescription id: ',presId);

           medicines.forEach(myFunction2);
            function myFunction2(items)
            {
                db.query('Insert into medicines set ?',{prescription_id:presId,medicine:items.name,breakfast:items.morning,lunch:items.afternoon,dinner:items.dinner},(errors,results)=>{
                    if(errors)
                    {
                        console.log(errors);
                    }else{
                        console.log('Inserted into medicines table');
                    }
                })
            }
        }
    });
    //const {operations,medicines,form_elements} = req.body;
    
  
}






exports.searchDoctors = (req, res) => {

    

    const { specialization } = req.body;

    db.query('SELECT * FROM doctor WHERE specialization = ?', [specialization], (error, results, fields) => {

        // console.log(results);
        if (error) {
            console.log(error);
        }


        if (results.length === 0) {
            return res.render('searchDoctors', {
                message: 'Sorry, no doctors for selected specialization in your city!',
                messageClass:'alert-warning'
            });

        }

        db.query('SELECT doctor_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city,longitude,latitude FROM doctor JOIN clinic using (clinic_id) WHERE specialization=? and city=?',[specialization,patientSess.city],(err,data)=>{

            if(err)
            {
                console.log(err);
            }
            else if(data.length===0)
            {
                return res.render('searchDoctors', {
                message: 'Sorry, no doctors for selected specialization in your city!',
                messageClass:'alert-warning'   
            });
            }
            else{
                const options = {
                    method: 'GET',
                    url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
                    headers: {
                      'X-RapidAPI-Key': 'fb71f22f1bmsh0d9d49de9405d41p17acd8jsnacd6e0fb5aac',
                      'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
                    }
                  };
                  
                  const distances = [];
                  axios.request(options).then(function (response) {
                      console.log(response.data);
                      data.forEach((x)=>{
                        // console.log(typeof(x))
                        // console.log(x)
                        let dis = distance(x.latitude,x.longitude,response.data.latitude,response.data.longitude)
                        x["distance"] = dis.toFixed(2);
                        // console.log(x)
                    });
                    //   console.log(typeof(response.data))
                    //   console.log(response.data.latitude)
                    //   console.log(response.data.longitude)
                    
                    console.log(data);
                    return res.render('afterSearch', { items: JSON.stringify(data)});
                      
                  }).catch(function (error) {
                      console.error(error);
                  });
               
                
                
                
                // console.log(typeof(data));
                

            }
        })
        

        

    });


}
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}



exports.doctorSignup = (req, res) => {
    console.log(req.body);

    const { clinicId, fname, lname, email, consultingCharges, password, contactNo, altContactNo, degree, specialization } = req.body;

    db.query('SELECT email from doctor_login where email = ?', [email], (error, results) => {
        if (error) {
            console.log(error);
        }


        if (results.length > 0) {
            return res.render('doctorSignup', {
                message: 'The email is already in use',
                messageClass:'alert-warning'
            });
        }




        //for clinic id search

        db.query('SELECT * from clinic WHERE clinic_id =?', [clinicId], async (err, results) => {
            if (err) {
                console.log(err);

            } else if (results.length > 0) {
                //entering into table=doctor_login

                let hashedPassword = await bcrypt.hash(password, 8);
                console.log(hashedPassword);


                db.query('INSERT INTO doctor_login SET ?', { email: email, password: hashedPassword }, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);

                    }
                });

                //entering into table=doctor
                db.query('INSERT INTO doctor SET ?', { first_name: fname, last_name: lname, email: email, clinic_id: clinicId, degree: degree, consulting_charges: consultingCharges, specialization: specialization }, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        
                        db.query('select max(doctor_id) lastDoctor from doctor',(err,resu)=>{

                            db.query('INSERT INTO doctor_contact SET ?',{doctor_id:resu[0].lastDoctor,contact_no:contactNo},(error,results)=>{
                                if(error)
                                {
                                    console.log(error);
                                }else{
                                        console.log(results);
                    
                                }
                            });
            
                            //For alternate contact number
                            db.query('INSERT INTO doctor_contact SET ?',{doctor_id:resu[0].lastDoctor,contact_no:altContactNo},(error,results)=>{
                                if(error)
                                {
                                    console.log(error);
                                }else{
                                        console.log(results);
                    
                                }
                            });
            
                        });
            

                        return res.render('doctorSignup', {
                            message: 'Data Saved, you will get registered once authenticated!',
                            messageClass:'alert-primary'
                        });
                    }

                });

            }
            else {
                return res.render('doctorSignup', {
                    message: 'Your clinic is not registered, kindly register your clinic first!',
                    messageClass:'alert-warning'
                });
            }
        });

        //End-for clinic id search       

    });

}

exports.bookDoctor=(req,res)=>{
    return res.render('bookDoctor');
}


//Clinic Registration
exports.registerPractice = (req, res) => {
    console.log(req.body);

    const { name, email, contact, plot, landmark, street, city } = req.body;

    db.query('SELECT email from clinic where email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'The email is already in use',
                messageClass:'alert-warning'
            });
        }


        // let hashedPassword = await bcrypt.hash(password,8);
        // console.log(hashedPassword);

        db.query('INSERT INTO clinic SET ?', { clinic_name: name, email: email, contact_no: contact, plot_number: plot, landmark: landmark, street: street, city: city }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);

                return res.render('registerPractice', {
                    message: 'Authentication initiated...Please check your mail for document submission!',
                    messageClass:'alert-primary'
                });
            }

        });
    });


}

//Booking
exports.bookingEntry = (req, res) => {
    // console.log(req.body);

    const { docId, dateBooked,timeBooked,appointment_type} = req.body;
    const dTime=dateBooked + ' ' + timeBooked + ':00';
    const neededStartDtime = new Date(dateBooked + 'T' + timeBooked + ':00' + '+' + '05:30');
    const neededStartDtime2 = dateBooked + 'T' + timeBooked + ':00' + '+' + '05:30';

    
    const neededEndDtime = new Date(dateBooked + 'T' + timeBooked + ':00' + '+' + '05:30');
    neededEndDtime.setMinutes(neededEndDtime.getMinutes()+15)
    neededEndDtime2 = neededEndDtime.toISOString();

    
     console.log(neededStartDtime)
     console.log(neededEndDtime)
    
    

    //fetching doctor and patients email IDs
    db.query('SELECT email as docEmail,first_name as fname from doctor where doctor_id= ?',[docId], (error24, results24) => {
        if (error24) {
            console.log(error24);
        } else {
            // console.log(re)
            const GUID = uuidv1();
            url1=`https://optum-videocallapp.azurewebsites.net/?groupId=${GUID}`
            console.log(url1)
            db.query('SELECT email as patEmail,first_name as fname from patient where patient_id= ?',[patientSess.ids], (error25, results25) => {
                if (error25) {
                    console.log(error25);
                } else {
                    console.log("here")
                    // console.log(results25[0].patEmail);
                    // console.log(results25);
                    //Google
                    const { OAuth2 }=google.auth
                    const oAuth2Client = new OAuth2(
                        '172066498275-ah403bhhh14fq2mdgctc8gj76q416jg2.apps.googleusercontent.com',
                        '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'
                    )

                    oAuth2Client.setCredentials({
                        refresh_token: '1//04Xg6d47xjXRkCgYIARAAGAQSNwF-L9IrTp2D1sqv5OJL6so0mJJ63z29BS0zbOqXPXKTMjKeyp7GBGFNThcHpwsQtF0BwXPK6bk',
                    })

                    // Create a new calender instance.
                    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
                    console.log("alter google calnder")
                    const event = {
                        summary: `Meeting with Doctor ${results24.fname}`,
                        location: `India`,
                        description: `Appointment Scheduled`,
                        colorId: 1,
                        start: {
                        dateTime: neededStartDtime2,
                        timeZone: 'Asia/Kolkata',
                        },
                        end: {
                        dateTime: neededEndDtime2,
                        timeZone: 'Asia/Kolkata',
                        },
                        'summary':'Apointment OPTUM-UHG',
                        'description':`Click this link to join-${url1}`,
                        'colorId':5,
                        'status':'confirmed',
                        'transparency':'opaque',
                        'visibility':'private',
                        'location':'India',
                        // 'attachments':[
                        //     {
                        //         'fileUrl':"https://drive.google.com/file/d/1A04KQu9qeeKmCsjpdy_F3HvyGTIgWtsv/view?usp=sharing"
                        //     }
                        // ],
                        attendees:[
                        {
                            'displayName':`${results24[0].fname}`,
                            'comment':'Doctor',
                            'optional':false,
                            'email':`${results24[0].docEmail}`,
                            'organiser':true,
                            'responseStatus':'accepted'
                        },
                        {
                            'displayName':`${results25[0].fname}`,
                            'comment':'Patient',
                            'optional':false,
                            'email':`${results25[0].patEmail}`,
                            'organiser':true,
                            'responseStatus':'accepted'
                        }
                        
                    ]
                    }

                        maxAttendees = 5
                        sendNotification = true
                        sendUpdate='all'
                        supportAttachments=true
                        console.log("before")
                        calendar.events.insert(
                        { calendarId: 'primary', resource: event, sendNotifications:sendNotification,
                        sendUpdates:sendUpdate,supportsAttachments:supportAttachments},
                        )
                        console.log("after")
                    //Google







                }
            });
        }
    });

    
    db.query('SELECT appointment_Dtime,doctor_id from booking where appointment_Dtime= ? and doctor_id = ?', [dTime,docId], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('bookDoctor', {
                message: 'This slot is unavailable, try another slot!',
                messageClass:'alert-warning'
            });
        }

        
        console.log(patientSess);
        db.query('INSERT INTO booking SET ?', { appointment_Dtime: dTime, patient_id:patientSess.ids, doctor_id: docId,appointment_type:appointment_type}, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);

                return res.render('bookDoctor', {
                    message: 'Appointment Fixed, Details has been sent to your mail',
                    messageClass:'alert-primary'
                });
            }

        });
    });
    
}
