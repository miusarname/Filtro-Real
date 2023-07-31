import { Expose, Type, Transform } from "class-transformer";
export class Costumers {

    @Expose({ name: "DNI" })
    @Transform(
      ({ value }) => {
        if (/^[0-9]+$/.test(value)) return value ? value : null;
        else
          throw {
            status: 406,
            message: `El datos titulos no cunple con los parametros acordados`,
          };
      },
      { toClassOnly: true }
    )
    Id: number | undefined;

    constructor(id: number, name: string, type: string) {
        this.Id = id;
      }
}