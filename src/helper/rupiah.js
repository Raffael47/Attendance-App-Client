const convertToRp = (value) => {
    return value?.toLocaleString("id-ID", {style: "currency", currency: "IDR"})?.replace("Rp", "Rp.")
};

module.exports = { convertToRp };