//this module takes care of diverse functions
const dateStuff = (function () {
    function isEven(value) {
        if (value%2 == 0) {
            return true;
        }   
        else {
            return false
        }
    }

    const getTodayDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }
    const getTomorrowDate = () => {
        let today = new Date();
        let tomorrow = new Date(today);
        let dd = String(today.getDate()).padStart(2, '0');
        let mmToday = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        mmToday = parseInt(mmToday);
        if( (dd >= 31 && !isEven(mmToday)) || (dd >= 30 && isEven(mmToday))) {
            let mm = String(tomorrow.getMonth()+2).padStart(2, '0'); //January is 0!
            let yyyy = tomorrow.getFullYear();
            tomorrow = yyyy + '-' + mm + '-' + '01';
            return tomorrow;
        } else {
            let dd = String(today.getDate() +1).padStart(2, '0');
            let mm = String(today.getMonth() + 2).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
        tomorrow = yyyy + '-' + mm + '-' + dd;
        return tomorrow;
        }
        
    }
    return {
        getTodayDate,
        getTomorrowDate
    }
})();

export default dateStuff