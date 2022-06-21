const { Company } = require('../../entities');

const deleteGoogleLogin = async (id) => {
    try {
        const company = await Company.findById(id);
        company.active = false;
        await company.save();
        return;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = deleteGoogleLogin;
