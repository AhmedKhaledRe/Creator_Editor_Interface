export const validate = (values) => {
    const errors = {};
    
    if (values.url && !/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/i.test(values.url)) {
        errors.url = "Please enter a correct youtube url";
    }

    return errors;
}
