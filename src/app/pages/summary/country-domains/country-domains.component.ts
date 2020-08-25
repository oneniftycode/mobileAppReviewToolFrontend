import { Component, OnDestroy, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';
import { registerMap } from 'echarts';

@Component({
  selector: 'ngx-country-domains',
  styleUrls: ['./country-domains.component.scss'],
  template: `
      <div echarts [options]="options" class="echarts"></div>
  `,
})
export class CountryDomainsComponent implements OnDestroy {

  latlong: any = {};
  mapData: any[];
  max = -Infinity;
  min = Infinity;
  options: any;

  bubbleTheme: any;
  geoColors: any[];
  @Input() domainAnalysis: any[];
  private alive = true;

  constructor(private theme: NbThemeService,
    private http: HttpClient) {
    this.domainAnalysis = [];
    combineLatest([
      this.http.get('assets/map/world.json'),
      this.theme.getJsTheme(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([map, config]: [any, any]) => {

        registerMap('world', map);

        const colors = config.variables;
        this.bubbleTheme = config.variables.bubbleMap;
        this.geoColors = [colors.success, colors.danger];

        this.mapData = [
                  { 'code': 'AF', 'name': 'Afghanistan', 'value': 0},
                  { 'code': 'AL', 'name': 'Albania', 'value': 0},
                  { 'code': 'DZ', 'name': 'Algeria', 'value': 0},
                  { 'code': 'AO', 'name': 'Angola', 'value': 0},
                  { 'code': 'AR', 'name': 'Argentina', 'value': 0},
                  { 'code': 'AM', 'name': 'Armenia', 'value': 0},
                  { 'code': 'AU', 'name': 'Australia', 'value': 0},
                  { 'code': 'AT', 'name': 'Austria', 'value': 0},
                  { 'code': 'AZ', 'name': 'Azerbaijan', 'value': 0},
                  { 'code': 'BH', 'name': 'Bahrain', 'value': 0},
                  { 'code': 'BD', 'name': 'Bangladesh', 'value': 0},
                  { 'code': 'BY', 'name': 'Belarus', 'value': 0},
                  { 'code': 'BE', 'name': 'Belgium', 'value': 0},
                  { 'code': 'BJ', 'name': 'Benin', 'value': 0},
                  { 'code': 'BT', 'name': 'Bhutan', 'value': 0},
                  { 'code': 'BO', 'name': 'Bolivia', 'value': 0},
                  { 'code': 'BA', 'name': 'Bosnia and Herzegovina', 'value': 0},
                  { 'code': 'BW', 'name': 'Botswana', 'value': 0},
                  { 'code': 'BR', 'name': 'Brazil', 'value': 0},
                  { 'code': 'BN', 'name': 'Brunei', 'value': 0},
                  { 'code': 'BG', 'name': 'Bulgaria', 'value': 0},
                  { 'code': 'BF', 'name': 'Burkina Faso', 'value': 0},
                  { 'code': 'BI', 'name': 'Burundi', 'value': 0},
                  { 'code': 'KH', 'name': 'Cambodia', 'value': 0},
                  { 'code': 'CM', 'name': 'Cameroon', 'value': 0},
                  { 'code': 'CA', 'name': 'Canada', 'value': 0},
                  { 'code': 'CV', 'name': 'Cape Verde', 'value': 0},
                  { 'code': 'CF', 'name': 'Central African Rep.', 'value': 0},
                  { 'code': 'TD', 'name': 'Chad', 'value': 0},
                  { 'code': 'CL', 'name': 'Chile', 'value': 0},
                  { 'code': 'CN', 'name': 'China', 'value': 0},
                  { 'code': 'CO', 'name': 'Colombia', 'value': 0},
                  { 'code': 'KM', 'name': 'Comoros', 'value': 0},
                  { 'code': 'CD', 'name': 'Congo, Dem. Rep.', 'value': 0},
                  { 'code': 'CG', 'name': 'Congo, Rep.', 'value': 0},
                  { 'code': 'CR', 'name': 'Costa Rica', 'value': 0},
                  { 'code': 'CI', 'name': 'Cote d\'Ivoire', 'value': 0},
                  { 'code': 'HR', 'name': 'Croatia', 'value': 0},
                  { 'code': 'CU', 'name': 'Cuba', 'value': 0},
                  { 'code': 'CY', 'name': 'Cyprus', 'value': 0},
                  { 'code': 'CZ', 'name': 'Czech Rep.', 'value': 0},
                  { 'code': 'DK', 'name': 'Denmark', 'value': 0},
                  { 'code': 'DJ', 'name': 'Djibouti', 'value': 0},
                  { 'code': 'DO', 'name': 'Dominican Rep.', 'value': 0},
                  { 'code': 'EC', 'name': 'Ecuador', 'value': 0},
                  { 'code': 'EG', 'name': 'Egypt', 'value': 0},
                  { 'code': 'SV', 'name': 'El Salvador', 'value': 0},
                  { 'code': 'GQ', 'name': 'Equatorial Guinea', 'value': 0},
                  { 'code': 'ER', 'name': 'Eritrea', 'value': 0},
                  { 'code': 'EE', 'name': 'Estonia', 'value': 0},
                  { 'code': 'ET', 'name': 'Ethiopia', 'value': 0},
                  { 'code': 'FJ', 'name': 'Fiji', 'value': 0},
                  { 'code': 'FI', 'name': 'Finland', 'value': 0},
                  { 'code': 'FR', 'name': 'France', 'value': 0},
                  { 'code': 'GA', 'name': 'Gabon', 'value': 0},
                  { 'code': 'GM', 'name': 'Gambia', 'value': 0},
                  { 'code': 'GE', 'name': 'Georgia', 'value': 0},
                  { 'code': 'DE', 'name': 'Germany', 'value': 0},
                  { 'code': 'GH', 'name': 'Ghana', 'value': 0},
                  { 'code': 'GR', 'name': 'Greece', 'value': 0},
                  { 'code': 'GT', 'name': 'Guatemala', 'value': 0},
                  { 'code': 'GN', 'name': 'Guinea', 'value': 0},
                  { 'code': 'GW', 'name': 'Guinea-Bissau', 'value': 0},
                  { 'code': 'GY', 'name': 'Guyana', 'value': 0},
                  { 'code': 'HT', 'name': 'Haiti', 'value': 0},
                  { 'code': 'HN', 'name': 'Honduras', 'value': 0},
                  { 'code': 'HK', 'name': 'Hong Kong, China', 'value': 0},
                  { 'code': 'HU', 'name': 'Hungary', 'value': 0},
                  { 'code': 'IS', 'name': 'Iceland', 'value': 0},
                  { 'code': 'IN', 'name': 'India', 'value': 0},
                  { 'code': 'ID', 'name': 'Indonesia', 'value': 0},
                  { 'code': 'IR', 'name': 'Iran', 'value': 0},
                  { 'code': 'IQ', 'name': 'Iraq', 'value': 0},
                  { 'code': 'IE', 'name': 'Ireland', 'value': 0},
                  { 'code': 'IL', 'name': 'Israel', 'value': 0},
                  { 'code': 'IT', 'name': 'Italy', 'value': 0},
                  { 'code': 'JM', 'name': 'Jamaica', 'value': 0},
                  { 'code': 'JP', 'name': 'Japan', 'value': 0},
                  { 'code': 'JO', 'name': 'Jordan', 'value': 0},
                  { 'code': 'KZ', 'name': 'Kazakhstan', 'value': 0},
                  { 'code': 'KE', 'name': 'Kenya', 'value': 0},
                  { 'code': 'KP', 'name': 'Korea, Dem. Rep.', 'value': 0},
                  { 'code': 'KR', 'name': 'Korea, Rep.', 'value': 0},
                  { 'code': 'KW', 'name': 'Kuwait', 'value': 0},
                  { 'code': 'KG', 'name': 'Kyrgyzstan', 'value': 0},
                  { 'code': 'LA', 'name': 'Laos', 'value': 0},
                  { 'code': 'LV', 'name': 'Latvia', 'value': 0},
                  { 'code': 'LB', 'name': 'Lebanon', 'value': 0},
                  { 'code': 'LS', 'name': 'Lesotho', 'value': 0},
                  { 'code': 'LR', 'name': 'Liberia', 'value': 0},
                  { 'code': 'LY', 'name': 'Libya', 'value': 0},
                  { 'code': 'LT', 'name': 'Lithuania', 'value': 0},
                  { 'code': 'LU', 'name': 'Luxembourg', 'value': 0},
                  { 'code': 'MK', 'name': 'Macedonia, FYR', 'value': 0},
                  { 'code': 'MG', 'name': 'Madagascar', 'value': 0},
                  { 'code': 'MW', 'name': 'Malawi', 'value': 0},
                  { 'code': 'MY', 'name': 'Malaysia', 'value': 0},
                  { 'code': 'ML', 'name': 'Mali', 'value': 0},
                  { 'code': 'MR', 'name': 'Mauritania', 'value': 0},
                  { 'code': 'MU', 'name': 'Mauritius', 'value': 0},
                  { 'code': 'MX', 'name': 'Mexico', 'value': 0},
                  { 'code': 'MD', 'name': 'Moldova', 'value': 0},
                  { 'code': 'MN', 'name': 'Mongolia', 'value': 0},
                  { 'code': 'ME', 'name': 'Montenegro', 'value': 0},
                  { 'code': 'MA', 'name': 'Morocco', 'value': 0},
                  { 'code': 'MZ', 'name': 'Mozambique', 'value': 0},
                  { 'code': 'MM', 'name': 'Myanmar', 'value': 0},
                  { 'code': 'NA', 'name': 'Namibia', 'value': 0},
                  { 'code': 'NP', 'name': 'Nepal', 'value': 0},
                  { 'code': 'NL', 'name': 'Netherlands', 'value': 0},
                  { 'code': 'NZ', 'name': 'New Zealand', 'value': 0},
                  { 'code': 'NI', 'name': 'Nicaragua', 'value': 0},
                  { 'code': 'NE', 'name': 'Niger', 'value': 0},
                  { 'code': 'NG', 'name': 'Nigeria', 'value': 0},
                  { 'code': 'NO', 'name': 'Norway', 'value': 0},
                  { 'code': 'OM', 'name': 'Oman', 'value': 0},
                  { 'code': 'PK', 'name': 'Pakistan', 'value': 0},
                  { 'code': 'PA', 'name': 'Panama', 'value': 0},
                  { 'code': 'PG', 'name': 'Papua New Guinea', 'value': 0},
                  { 'code': 'PY', 'name': 'Paraguay', 'value': 0},
                  { 'code': 'PE', 'name': 'Peru', 'value': 0},
                  { 'code': 'PH', 'name': 'Philippines', 'value': 0},
                  { 'code': 'PL', 'name': 'Poland', 'value': 0},
                  { 'code': 'PT', 'name': 'Portugal', 'value': 0},
                  { 'code': 'PR', 'name': 'Puerto Rico', 'value': 0},
                  { 'code': 'QA', 'name': 'Qatar', 'value': 0},
                  { 'code': 'RO', 'name': 'Romania', 'value': 0},
                  { 'code': 'RU', 'name': 'Russia', 'value': 0},
                  { 'code': 'RW', 'name': 'Rwanda', 'value': 0},
                  { 'code': 'SA', 'name': 'Saudi Arabia', 'value': 0},
                  { 'code': 'SN', 'name': 'Senegal', 'value': 0},
                  { 'code': 'RS', 'name': 'Serbia', 'value': 0},
                  { 'code': 'SL', 'name': 'Sierra Leone', 'value': 0},
                  { 'code': 'SG', 'name': 'Singapore', 'value': 0},
                  { 'code': 'SK', 'name': 'Slovak Republic', 'value': 0},
                  { 'code': 'SI', 'name': 'Slovenia', 'value': 0},
                  { 'code': 'SB', 'name': 'Solomon Islands', 'value': 0},
                  { 'code': 'SO', 'name': 'Somalia', 'value': 0},
                  { 'code': 'ZA', 'name': 'South Africa', 'value': 0},
                  { 'code': 'ES', 'name': 'Spain', 'value': 0},
                  { 'code': 'LK', 'name': 'Sri Lanka', 'value': 0},
                  { 'code': 'SD', 'name': 'Sudan', 'value': 0},
                  { 'code': 'SR', 'name': 'Suriname', 'value': 0},
                  { 'code': 'SZ', 'name': 'Swaziland', 'value': 0},
                  { 'code': 'SE', 'name': 'Sweden', 'value': 0},
                  { 'code': 'CH', 'name': 'Switzerland', 'value': 0},
                  { 'code': 'SY', 'name': 'Syria', 'value': 0},
                  { 'code': 'TW', 'name': 'Taiwan', 'value': 0},
                  { 'code': 'TJ', 'name': 'Tajikistan', 'value': 0},
                  { 'code': 'TZ', 'name': 'Tanzania', 'value': 0},
                  { 'code': 'TH', 'name': 'Thailand', 'value': 0},
                  { 'code': 'TG', 'name': 'Togo', 'value': 0},
                  { 'code': 'TT', 'name': 'Trinidad and Tobago', 'value': 0},
                  { 'code': 'TN', 'name': 'Tunisia', 'value': 0},
                  { 'code': 'TR', 'name': 'Turkey', 'value': 0},
                  { 'code': 'TM', 'name': 'Turkmenistan', 'value': 0},
                  { 'code': 'UG', 'name': 'Uganda', 'value': 0},
                  { 'code': 'UA', 'name': 'Ukraine', 'value': 0},
                  { 'code': 'AE', 'name': 'United Arab Emirates', 'value': 0},
                  { 'code': 'GB', 'name': 'United Kingdom', 'value': 0},
                  { 'code': 'US', 'name': 'United States of America', 'value': 0},
                  { 'code': 'UY', 'name': 'Uruguay', 'value': 0},
                  { 'code': 'UZ', 'name': 'Uzbekistan', 'value': 0},
                  { 'code': 'VE', 'name': 'Venezuela', 'value': 0},
                  { 'code': 'PS', 'name': 'West Bank and Gaza', 'value': 0},
                  { 'code': 'VN', 'name': 'Vietnam', 'value': 0},
                  { 'code': 'YE', 'name': 'Yemen, Rep.', 'value': 0},
                  { 'code': 'ZM', 'name': 'Zambia', 'value': 0},
                  { 'code': 'ZW', 'name': 'Zimbabwe', 'value': 0}];
        this.mapData.forEach((itemOpt, key) => {
          this.domainAnalysis.forEach(country => {

            if( country.country_short == itemOpt.code ){
                if(country.bad == "no"){
                  this.mapData[key].value = 0;
                }else if(country.bad == "yes"){
                  this.mapData[key].value = 1;
                }
            }
          });
        });

        this.options = {


          tooltip: {
            trigger: 'item',
            formatter: params => {
              return `${params.name}: ${params.value}`;
            },
          },
          visualMap: {
            show: false,
            min: 0,
            max: 1,
            inRange: {
              color: [colors.success, colors.danger],
            },

          },

          series: [
            {
              type: 'map',
              map: 'world',
              roam: true,
              label: {
                emphasis: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  areaColor: this.bubbleTheme.areaColor,
                  borderColor: this.bubbleTheme.areaBorderColor,
                },
                emphasis: {
                  areaColor: this.bubbleTheme.areaHoverColor,
                },
              },
              zoom: 1.1,
              data:  this.domainAnalysis.map(itemOpt => {
                let log =  {
                  name: itemOpt.country,
                  value: itemOpt.bad === "yes"? 1 : 0,

                  // itemStyle: {
                  //   normal: {
                  //     color: itemOpt.color,
                  //   },
                  // },
                };
                return log;
              }),
            },
          ],
        };
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getRandomGeoColor() {
    const index = Math.round(Math.random() * this.geoColors.length);
    return this.geoColors[index];
  }
}
