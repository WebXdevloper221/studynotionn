const mailSender = require("../utils/mailSender");
const { contactUsEmail } = require("../mail/templates/contactFormRes");

exports.contactUs = async (req, res) => {
  const { firstname, lastname = "", email, message, phoneNo, countrycode = "" } = req.body;

  if (!firstname || !email || !message || !phoneNo) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, phone number, and message",
    });
  }

  try {
    await mailSender(
      email,
      "StudyNotion contact form received",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );

    if (process.env.MAIL_USER && process.env.MAIL_USER !== email) {
      await mailSender(
        process.env.MAIL_USER,
        `New StudyNotion contact from ${firstname} ${lastname}`.trim(),
        contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
      );
    }

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.log("CONTACT_US_ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not submit contact form",
    });
  }
};
