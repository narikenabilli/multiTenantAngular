import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  constructor() {}

  getTenantForHostname(hostname: string): Tenant {
    return this.getTenantForHost(hostname.split(".")[0]) ? this.getTenantForHost(hostname.split(".")[0]) : Tenant.CLIENT1 ;
  }

  getTenantForString(s: string) {
    for (const e in Tenant) {
      if (e.toLowerCase() === s.toLowerCase()) {
        return Tenant[e] as Tenant;
      }
    }
    return null;
  }

  getTenantForHost(host: string): Tenant {
    return this.getTenantForString(host);
  }

  getTenant(): Tenant {
    return this.getTenantForHostname(location.hostname);
  }

  addTenantToHeaders(headers: HttpHeaders): HttpHeaders {
    return headers.append("X-Tenant-ID", this.getTenant());
  }
}

// defining the tenants, to be moved to a DB and all the tenants are to be defined there
export enum Tenant {
  CLIENT1 = "client1",
  CLIENT2 = "client2",
  CLIENT4 = "client4"
}
