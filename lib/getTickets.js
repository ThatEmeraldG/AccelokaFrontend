export const fetchTickets = async (pageNumber = 1, pageSize = 10, filters = {}) => {
  try {
    const params = {
      PageNumber: pageNumber.toString(),
      PageSize: pageSize.toString(),
      TicketCode: filters.TicketCode || "",
      TicketName: filters.TicketName || "",
      CategoryId: filters.CategoryId ? filters.CategoryId.toString() : "",
      CategoryName: filters.CategoryName || "",
      EventStart: filters.EventStart ? new Date(filters.EventStart).toISOString() : "",
      EventEnd: filters.EventEnd ? new Date(filters.EventEnd).toISOString() : "",
      Price: filters.Price ? filters.Price.toString() : "",
      OrderBy: filters.OrderBy || "ticketCode",
      OrderDirection: filters.OrderDirection || "ASC",
    };

    const filteredEntries = Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== ""
    );
    const queryParams = new URLSearchParams(filteredEntries);

    console.log("Query string:", queryParams.toString());

    const response = await fetch(`/api/tickets?${queryParams}`);

    if (!response.ok) throw new Error("Failed to fetch tickets");

    const data = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching tickets: ", error);
    return { data: [], totalRecords: 0 };
  }
};
