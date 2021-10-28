export function daysBetween(date1, date2) {
    const oneDay = 1000 * 60 * 60 * 24;

    const dateFirstMs = date1.getTime();
    const dateSecondMs = date2.getTime();
    const differenceMs = dateSecondMs - dateFirstMs;

    return Math.round(differenceMs / oneDay);
}

export function geoCalendar() {

    return {
        firstDayOfWeek: 1,
        dayNames: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
        dayNamesShort: ['კვ', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
        dayNamesMin: ['კ', 'ო', 'ს', 'ო', 'ხ', 'პ', 'შ'],
        monthNames: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო',
            'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'],
        monthNamesShort: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
        today: 'დღეს',
        clear: 'გასუთავება'
    };
}
