export function formatIndianRupees(decimalValue) {
    const indianRupeeSymbol = "₹";
    const formattedValue = decimalValue.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  
    return formattedValue.replace("₹", indianRupeeSymbol);
  }

export function filteredInputData(input, datas) {
    const filteredInputData = datas.filter((data) =>
      data?.title?.toLowerCase()?.includes(input.toLowerCase()) && data.id
    );
    return filteredInputData;
  }

  