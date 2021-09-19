export const validate = (values) => {
    const errors = {};
    
    if (values.youtube_url && !/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/i.test(values.youtube_url)) {
        errors.youtube_url = "Please enter a correct youtube url";
    }

    return errors;
}
