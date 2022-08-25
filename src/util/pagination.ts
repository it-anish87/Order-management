export default class Pagination {
    static getPagination = (page: number = 1, size: number = 3) => {
        const limit = size ? +size : 5;            //limit = size
        const offset = page ? page * limit : 0;    //offset = page*size
        return { limit, offset };                  //default 5 records with page index 0
      };

    static getPagingData = (data: { count: any; rows: any; }, page: number, limit: number) => {
        const { count: totalItems, rows: oderRecords } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, oderRecords, totalPages, currentPage };
      };
}
