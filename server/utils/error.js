const catchError = (error,res) => {
    console.log(error);
    res.json({ message: 'An error has occured'});
}

module.exports = catchError;