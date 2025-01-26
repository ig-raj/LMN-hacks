const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Hardcoded recruiters list
const recruiters = {

    "Software Developer": [
      {name: "John Doe", email: "john.doe@techcorp.com", company: "TechCorp"},
      {name: "Alice Johnson", email: "alice.johnson@techstartup.com", company: "TechStartup"},
      {name: "Mark Smith", email: "mark.smith@innovatech.com", company: "Innovatech"},
      {name: "Lucy Williams", email: "lucy.williams@devsolutions.com", company: "DevSolutions"},
      {name: "David Clark", email: "david.clark@codeworks.com", company: "CodeWorks"},
      {name: "Emma Stone", email: "emma.stone@techzone.com", company: "TechZone"},
      {name: "Oliver White", email: "oliver.white@fusiontech.com", company: "FusionTech"},
      {name: "Ava Taylor", email: "ava.taylor@softwave.com", company: "SoftWave"},
      {name: "Ethan Johnson", email: "ethan.johnson@nextgen.com", company: "NextGen"},
      {name: "Sophie Brown", email: "sophie.brown@websolutions.com", company: "WebSolutions"}
    ],
    "Data Scientist": [
      {name: "Jane Smith", email: "jane.smith@datasciencehub.com", company: "DataScienceHub"},
      {name: "Robert Lee", email: "robert.lee@analyticspro.com", company: "AnalyticsPro"},
      {name: "Olivia Taylor", email: "olivia.taylor@aianalytics.com", company: "AIAnalytics"},
      {name: "James Brown", email: "james.brown@dataexplorers.com", company: "DataExplorers"},
      {name: "Ethan Walker", email: "ethan.walker@bigdataworks.com", company: "BigDataWorks"},
      {name: "Charlotte Davis", email: "charlotte.davis@datasolutions.com", company: "DataSolutions"},
      {name: "Liam Scott", email: "liam.scott@predictiveanalytics.com", company: "PredictiveAnalytics"},
      {name: "Sophia Harris", email: "sophia.harris@mlworks.com", company: "MLWorks"},
      {name: "Lucas White", email: "lucas.white@datafuture.com", company: "DataFuture"},
      {name: "Mia Clark", email: "mia.clark@aihub.com", company: "AIHub"}
    ],
    "Frontend Developer": [
      {name: "Emily Davis", email: "emily.davis@designify.com", company: "Designify"},
      {name: "Michael Brown", email: "michael.brown@webmasters.com", company: "WebMasters"},
      {name: "Sophia Anderson", email: "sophia.anderson@creativeweb.com", company: "CreativeWeb"},
      {name: "Daniel Harris", email: "daniel.harris@pixelcraft.com", company: "PixelCraft"},
      {name: "Isabella Martin", email: "isabella.martin@webdevsolutions.com", company: "WebDevSolutions"},
      {name: "Oliver Green", email: "oliver.green@freshedge.com", company: "FreshEdge"},
      {name: "Grace Mitchell", email: "grace.mitchell@frontendworks.com", company: "FrontendWorks"},
      {name: "Zoe Taylor", email: "zoe.taylor@nextgenweb.com", company: "NextGenWeb"},
      {name: "Jack Martin", email: "jack.martin@webtechnologies.com", company: "WebTechnologies"},
      {name: "Benjamin Scott", email: "benjamin.scott@designstudios.com", company: "DesignStudios"}
    ],
    "Backend Developer": [
      {name: "Daniel Lee", email: "daniel.lee@servertech.com", company: "ServerTech"},
      {name: "Lucas Harris", email: "lucas.harris@databasecloud.com", company: "DatabaseCloud"},
      {name: "Ella Moore", email: "ella.moore@apidev.com", company: "APIDev"},
      {name: "Jack Scott", email: "jack.scott@codebase.com", company: "CodeBase"},
      {name: "Grace Evans", email: "grace.evans@backendworks.com", company: "BackendWorks"},
      {name: "Liam Lee", email: "liam.lee@cloudsolutions.com", company: "CloudSolutions"},
      {name: "Mason Wright", email: "mason.wright@serverflow.com", company: "ServerFlow"},
      {name: "Ethan Walker", email: "ethan.walker@backendinnovations.com", company: "BackendInnovations"},
      {name: "Charlotte Green", email: "charlotte.green@coretech.com", company: "CoreTech"},
      {name: "Aiden Martin", email: "aiden.martin@backenddevs.com", company: "BackendDevs"}
    ],
    "UX/UI Designer": [
      {name: "Ava Taylor", email: "ava.taylor@uxcreations.com", company: "UXCreations"},
      {name: "Charlotte Green", email: "charlotte.green@designstudio.com", company: "DesignStudio"},
      {name: "Benjamin Adams", email: "benjamin.adams@uxdesigners.com", company: "UXDesigners"},
      {name: "Mia Lewis", email: "mia.lewis@creativedesigns.com", company: "CreativeDesigns"},
      {name: "Liam Harris", email: "liam.harris@studiosolutions.com", company: "StudioSolutions"},
      {name: "Ella Wright", email: "ella.wright@uiworks.com", company: "UIWorks"},
      {name: "Sophie Adams", email: "sophie.adams@uxsolutions.com", company: "UXSolutions"},
      {name: "Daniel Miller", email: "daniel.miller@uxprojects.com", company: "UXProjects"},
      {name: "Lucy Scott", email: "lucy.scott@frontenddesigns.com", company: "FrontendDesigns"},
      {name: "Olivia Davis", email: "olivia.davis@creativedesignlab.com", company: "CreativeDesignLab"}
    ]

  
};

// API to handle resume upload and job role selection
app.post("/submit", upload.single("resume"), async (req, res) => {
  const { jobRole, userEmail, userPassword } = req.body;

  if (!jobRole || !userEmail || !userPassword) {
    return res.status(400).send("Missing job role or user credentials.");
  }

  const recruiterList = recruiters[jobRole];
  if (!recruiterList) {
    return res.status(404).send("Job role not found.");
  }

  const resumePath = req.file?.path;
  if (!resumePath) {
    return res.status(400).send("Resume not uploaded.");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: userPassword,
      },
    });

    for (const recruiter of recruiterList) {
      const mailOptions = {
        from: userEmail,
        to: recruiter.email,
        subject: `Application for ${jobRole}`,
        text: `Dear ${recruiter.name},\n\nI am applying for the ${jobRole} position. Please find my resume attached.\n\nBest regards,\n[Your Name]`,
        attachments: [
          {
            filename: req.file.originalname,
            path: resumePath,
          },
        ],
      };

      await transporter.sendMail(mailOptions);
    }

    fs.unlinkSync(resumePath);
    res.send("Application submitted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending emails.");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
