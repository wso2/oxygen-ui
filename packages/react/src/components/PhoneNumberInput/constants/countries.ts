/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export interface Country {
  /**
   * Country code.
   * @example "AF"
   * @see {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2}
   */
  code: string;
  /**
   * Country dial code.
   * @example "+93"
   */
  dialCode: string;
  /**
   * Country name.
   */
  name: string;
}

export const countries: readonly Country[] = [
  {
    code: 'AF',
    dialCode: '+93',
    name: 'Afghanistan',
  },
  {
    code: 'AX',
    dialCode: '+358',
    name: 'Aland Islands',
  },
  {
    code: 'AL',
    dialCode: '+355',
    name: 'Albania',
  },
  {
    code: 'DZ',
    dialCode: '+213',
    name: 'Algeria',
  },
  {
    code: 'AS',
    dialCode: '+1684',
    name: 'AmericanSamoa',
  },
  {
    code: 'AD',
    dialCode: '+376',
    name: 'Andorra',
  },
  {
    code: 'AO',
    dialCode: '+244',
    name: 'Angola',
  },
  {
    code: 'AI',
    dialCode: '+1264',
    name: 'Anguilla',
  },
  {
    code: 'AQ',
    dialCode: '+672',
    name: 'Antarctica',
  },
  {
    code: 'AG',
    dialCode: '+1268',
    name: 'Antigua and Barbuda',
  },
  {
    code: 'AR',
    dialCode: '+54',
    name: 'Argentina',
  },
  {
    code: 'AM',
    dialCode: '+374',
    name: 'Armenia',
  },
  {
    code: 'AW',
    dialCode: '+297',
    name: 'Aruba',
  },
  {
    code: 'AU',
    dialCode: '+61',
    name: 'Australia',
  },
  {
    code: 'AT',
    dialCode: '+43',
    name: 'Austria',
  },
  {
    code: 'AZ',
    dialCode: '+994',
    name: 'Azerbaijan',
  },
  {
    code: 'BS',
    dialCode: '+1242',
    name: 'Bahamas',
  },
  {
    code: 'BH',
    dialCode: '+973',
    name: 'Bahrain',
  },
  {
    code: 'BD',
    dialCode: '+880',
    name: 'Bangladesh',
  },
  {
    code: 'BB',
    dialCode: '+1246',
    name: 'Barbados',
  },
  {
    code: 'BY',
    dialCode: '+375',
    name: 'Belarus',
  },
  {
    code: 'BE',
    dialCode: '+32',
    name: 'Belgium',
  },
  {
    code: 'BZ',
    dialCode: '+501',
    name: 'Belize',
  },
  {
    code: 'BJ',
    dialCode: '+229',
    name: 'Benin',
  },
  {
    code: 'BM',
    dialCode: '+1441',
    name: 'Bermuda',
  },
  {
    code: 'BT',
    dialCode: '+975',
    name: 'Bhutan',
  },
  {
    code: 'BO',
    dialCode: '+591',
    name: 'Bolivia, Plurinational State of',
  },
  {
    code: 'BA',
    dialCode: '+387',
    name: 'Bosnia and Herzegovina',
  },
  {
    code: 'BW',
    dialCode: '+267',
    name: 'Botswana',
  },
  {
    code: 'BR',
    dialCode: '+55',
    name: 'Brazil',
  },
  {
    code: 'IO',
    dialCode: '+246',
    name: 'British Indian Ocean Territory',
  },
  {
    code: 'BN',
    dialCode: '+673',
    name: 'Brunei Darussalam',
  },
  {
    code: 'BG',
    dialCode: '+359',
    name: 'Bulgaria',
  },
  {
    code: 'BF',
    dialCode: '+226',
    name: 'Burkina Faso',
  },
  {
    code: 'BI',
    dialCode: '+257',
    name: 'Burundi',
  },
  {
    code: 'KH',
    dialCode: '+855',
    name: 'Cambodia',
  },
  {
    code: 'CM',
    dialCode: '+237',
    name: 'Cameroon',
  },
  {
    code: 'CA',
    dialCode: '+1',
    name: 'Canada',
  },
  {
    code: 'CV',
    dialCode: '+238',
    name: 'Cape Verde',
  },
  {
    code: 'KY',
    dialCode: '+345',
    name: 'Cayman Islands',
  },
  {
    code: 'CF',
    dialCode: '+236',
    name: 'Central African Republic',
  },
  {
    code: 'TD',
    dialCode: '+235',
    name: 'Chad',
  },
  {
    code: 'CL',
    dialCode: '+56',
    name: 'Chile',
  },
  {
    code: 'CN',
    dialCode: '+86',
    name: 'China',
  },
  {
    code: 'CX',
    dialCode: '+61',
    name: 'Christmas Island',
  },
  {
    code: 'CC',
    dialCode: '+61',
    name: 'Cocos (Keeling) Islands',
  },
  {
    code: 'CO',
    dialCode: '+57',
    name: 'Colombia',
  },
  {
    code: 'KM',
    dialCode: '+269',
    name: 'Comoros',
  },
  {
    code: 'CG',
    dialCode: '+242',
    name: 'Congo',
  },
  {
    code: 'CD',
    dialCode: '+243',
    name: 'Congo, The Democratic Republic of the Congo',
  },
  {
    code: 'CK',
    dialCode: '+682',
    name: 'Cook Islands',
  },
  {
    code: 'CR',
    dialCode: '+506',
    name: 'Costa Rica',
  },
  {
    code: 'CI',
    dialCode: '+225',
    name: "Cote d'Ivoire",
  },
  {
    code: 'HR',
    dialCode: '+385',
    name: 'Croatia',
  },
  {
    code: 'CU',
    dialCode: '+53',
    name: 'Cuba',
  },
  {
    code: 'CY',
    dialCode: '+357',
    name: 'Cyprus',
  },
  {
    code: 'CZ',
    dialCode: '+420',
    name: 'Czech Republic',
  },
  {
    code: 'DK',
    dialCode: '+45',
    name: 'Denmark',
  },
  {
    code: 'DJ',
    dialCode: '+253',
    name: 'Djibouti',
  },
  {
    code: 'DM',
    dialCode: '+1767',
    name: 'Dominica',
  },
  {
    code: 'DO',
    dialCode: '+1849',
    name: 'Dominican Republic',
  },
  {
    code: 'EC',
    dialCode: '+593',
    name: 'Ecuador',
  },
  {
    code: 'EG',
    dialCode: '+20',
    name: 'Egypt',
  },
  {
    code: 'SV',
    dialCode: '+503',
    name: 'El Salvador',
  },
  {
    code: 'GQ',
    dialCode: '+240',
    name: 'Equatorial Guinea',
  },
  {
    code: 'ER',
    dialCode: '+291',
    name: 'Eritrea',
  },
  {
    code: 'EE',
    dialCode: '+372',
    name: 'Estonia',
  },
  {
    code: 'ET',
    dialCode: '+251',
    name: 'Ethiopia',
  },
  {
    code: 'FK',
    dialCode: '+500',
    name: 'Falkland Islands (Malvinas)',
  },
  {
    code: 'FO',
    dialCode: '+298',
    name: 'Faroe Islands',
  },
  {
    code: 'FJ',
    dialCode: '+679',
    name: 'Fiji',
  },
  {
    code: 'FI',
    dialCode: '+358',
    name: 'Finland',
  },
  {
    code: 'FR',
    dialCode: '+33',
    name: 'France',
  },
  {
    code: 'GF',
    dialCode: '+594',
    name: 'French Guiana',
  },
  {
    code: 'PF',
    dialCode: '+689',
    name: 'French Polynesia',
  },
  {
    code: 'GA',
    dialCode: '+241',
    name: 'Gabon',
  },
  {
    code: 'GM',
    dialCode: '+220',
    name: 'Gambia',
  },
  {
    code: 'GE',
    dialCode: '+995',
    name: 'Georgia',
  },
  {
    code: 'DE',
    dialCode: '+49',
    name: 'Germany',
  },
  {
    code: 'GH',
    dialCode: '+233',
    name: 'Ghana',
  },
  {
    code: 'GI',
    dialCode: '+350',
    name: 'Gibraltar',
  },
  {
    code: 'GR',
    dialCode: '+30',
    name: 'Greece',
  },
  {
    code: 'GL',
    dialCode: '+299',
    name: 'Greenland',
  },
  {
    code: 'GD',
    dialCode: '+1473',
    name: 'Grenada',
  },
  {
    code: 'GP',
    dialCode: '+590',
    name: 'Guadeloupe',
  },
  {
    code: 'GU',
    dialCode: '+1671',
    name: 'Guam',
  },
  {
    code: 'GT',
    dialCode: '+502',
    name: 'Guatemala',
  },
  {
    code: 'GG',
    dialCode: '+44',
    name: 'Guernsey',
  },
  {
    code: 'GN',
    dialCode: '+224',
    name: 'Guinea',
  },
  {
    code: 'GW',
    dialCode: '+245',
    name: 'Guinea-Bissau',
  },
  {
    code: 'GY',
    dialCode: '+592',
    name: 'Guyana',
  },
  {
    code: 'HT',
    dialCode: '+509',
    name: 'Haiti',
  },
  {
    code: 'VA',
    dialCode: '+379',
    name: 'Holy See (Vatican City State)',
  },
  {
    code: 'HN',
    dialCode: '+504',
    name: 'Honduras',
  },
  {
    code: 'HK',
    dialCode: '+852',
    name: 'Hong Kong',
  },
  {
    code: 'HU',
    dialCode: '+36',
    name: 'Hungary',
  },
  {
    code: 'IS',
    dialCode: '+354',
    name: 'Iceland',
  },
  {
    code: 'IN',
    dialCode: '+91',
    name: 'India',
  },
  {
    code: 'ID',
    dialCode: '+62',
    name: 'Indonesia',
  },
  {
    code: 'IR',
    dialCode: '+98',
    name: 'Iran, Islamic Republic of Persian Gulf',
  },
  {
    code: 'IQ',
    dialCode: '+964',
    name: 'Iraq',
  },
  {
    code: 'IE',
    dialCode: '+353',
    name: 'Ireland',
  },
  {
    code: 'IM',
    dialCode: '+44',
    name: 'Isle of Man',
  },
  {
    code: 'IL',
    dialCode: '+972',
    name: 'Israel',
  },
  {
    code: 'IT',
    dialCode: '+39',
    name: 'Italy',
  },
  {
    code: 'JM',
    dialCode: '+1876',
    name: 'Jamaica',
  },
  {
    code: 'JP',
    dialCode: '+81',
    name: 'Japan',
  },
  {
    code: 'JE',
    dialCode: '+44',
    name: 'Jersey',
  },
  {
    code: 'JO',
    dialCode: '+962',
    name: 'Jordan',
  },
  {
    code: 'KZ',
    dialCode: '+7',
    name: 'Kazakhstan',
  },
  {
    code: 'KE',
    dialCode: '+254',
    name: 'Kenya',
  },
  {
    code: 'KI',
    dialCode: '+686',
    name: 'Kiribati',
  },
  {
    code: 'KP',
    dialCode: '+850',
    name: "Korea, Democratic People's Republic of Korea",
  },
  {
    code: 'KR',
    dialCode: '+82',
    name: 'Korea, Republic of South Korea',
  },
  {
    code: 'KW',
    dialCode: '+965',
    name: 'Kuwait',
  },
  {
    code: 'KG',
    dialCode: '+996',
    name: 'Kyrgyzstan',
  },
  {
    code: 'LA',
    dialCode: '+856',
    name: 'Laos',
  },
  {
    code: 'LV',
    dialCode: '+371',
    name: 'Latvia',
  },
  {
    code: 'LB',
    dialCode: '+961',
    name: 'Lebanon',
  },
  {
    code: 'LS',
    dialCode: '+266',
    name: 'Lesotho',
  },
  {
    code: 'LR',
    dialCode: '+231',
    name: 'Liberia',
  },
  {
    code: 'LY',
    dialCode: '+218',
    name: 'Libyan Arab Jamahiriya',
  },
  {
    code: 'LI',
    dialCode: '+423',
    name: 'Liechtenstein',
  },
  {
    code: 'LT',
    dialCode: '+370',
    name: 'Lithuania',
  },
  {
    code: 'LU',
    dialCode: '+352',
    name: 'Luxembourg',
  },
  {
    code: 'MO',
    dialCode: '+853',
    name: 'Macao',
  },
  {
    code: 'MK',
    dialCode: '+389',
    name: 'Macedonia',
  },
  {
    code: 'MG',
    dialCode: '+261',
    name: 'Madagascar',
  },
  {
    code: 'MW',
    dialCode: '+265',
    name: 'Malawi',
  },
  {
    code: 'MY',
    dialCode: '+60',
    name: 'Malaysia',
  },
  {
    code: 'MV',
    dialCode: '+960',
    name: 'Maldives',
  },
  {
    code: 'ML',
    dialCode: '+223',
    name: 'Mali',
  },
  {
    code: 'MT',
    dialCode: '+356',
    name: 'Malta',
  },
  {
    code: 'MH',
    dialCode: '+692',
    name: 'Marshall Islands',
  },
  {
    code: 'MQ',
    dialCode: '+596',
    name: 'Martinique',
  },
  {
    code: 'MR',
    dialCode: '+222',
    name: 'Mauritania',
  },
  {
    code: 'MU',
    dialCode: '+230',
    name: 'Mauritius',
  },
  {
    code: 'YT',
    dialCode: '+262',
    name: 'Mayotte',
  },
  {
    code: 'MX',
    dialCode: '+52',
    name: 'Mexico',
  },
  {
    code: 'FM',
    dialCode: '+691',
    name: 'Micronesia, Federated States of Micronesia',
  },
  {
    code: 'MD',
    dialCode: '+373',
    name: 'Moldova',
  },
  {
    code: 'MC',
    dialCode: '+377',
    name: 'Monaco',
  },
  {
    code: 'MN',
    dialCode: '+976',
    name: 'Mongolia',
  },
  {
    code: 'ME',
    dialCode: '+382',
    name: 'Montenegro',
  },
  {
    code: 'MS',
    dialCode: '+1664',
    name: 'Montserrat',
  },
  {
    code: 'MA',
    dialCode: '+212',
    name: 'Morocco',
  },
  {
    code: 'MZ',
    dialCode: '+258',
    name: 'Mozambique',
  },
  {
    code: 'MM',
    dialCode: '+95',
    name: 'Myanmar',
  },
  {
    code: 'NA',
    dialCode: '+264',
    name: 'Namibia',
  },
  {
    code: 'NR',
    dialCode: '+674',
    name: 'Nauru',
  },
  {
    code: 'NP',
    dialCode: '+977',
    name: 'Nepal',
  },
  {
    code: 'NL',
    dialCode: '+31',
    name: 'Netherlands',
  },
  {
    code: 'AN',
    dialCode: '+599',
    name: 'Netherlands Antilles',
  },
  {
    code: 'NC',
    dialCode: '+687',
    name: 'New Caledonia',
  },
  {
    code: 'NZ',
    dialCode: '+64',
    name: 'New Zealand',
  },
  {
    code: 'NI',
    dialCode: '+505',
    name: 'Nicaragua',
  },
  {
    code: 'NE',
    dialCode: '+227',
    name: 'Niger',
  },
  {
    code: 'NG',
    dialCode: '+234',
    name: 'Nigeria',
  },
  {
    code: 'NU',
    dialCode: '+683',
    name: 'Niue',
  },
  {
    code: 'NF',
    dialCode: '+672',
    name: 'Norfolk Island',
  },
  {
    code: 'MP',
    dialCode: '+1670',
    name: 'Northern Mariana Islands',
  },
  {
    code: 'NO',
    dialCode: '+47',
    name: 'Norway',
  },
  {
    code: 'OM',
    dialCode: '+968',
    name: 'Oman',
  },
  {
    code: 'PK',
    dialCode: '+92',
    name: 'Pakistan',
  },
  {
    code: 'PW',
    dialCode: '+680',
    name: 'Palau',
  },
  {
    code: 'PS',
    dialCode: '+970',
    name: 'Palestinian Territory, Occupied',
  },
  {
    code: 'PA',
    dialCode: '+507',
    name: 'Panama',
  },
  {
    code: 'PG',
    dialCode: '+675',
    name: 'Papua New Guinea',
  },
  {
    code: 'PY',
    dialCode: '+595',
    name: 'Paraguay',
  },
  {
    code: 'PE',
    dialCode: '+51',
    name: 'Peru',
  },
  {
    code: 'PH',
    dialCode: '+63',
    name: 'Philippines',
  },
  {
    code: 'PN',
    dialCode: '+872',
    name: 'Pitcairn',
  },
  {
    code: 'PL',
    dialCode: '+48',
    name: 'Poland',
  },
  {
    code: 'PT',
    dialCode: '+351',
    name: 'Portugal',
  },
  {
    code: 'PR',
    dialCode: '+1939',
    name: 'Puerto Rico',
  },
  {
    code: 'QA',
    dialCode: '+974',
    name: 'Qatar',
  },
  {
    code: 'RO',
    dialCode: '+40',
    name: 'Romania',
  },
  {
    code: 'RU',
    dialCode: '+7',
    name: 'Russia',
  },
  {
    code: 'RW',
    dialCode: '+250',
    name: 'Rwanda',
  },
  {
    code: 'RE',
    dialCode: '+262',
    name: 'Reunion',
  },
  {
    code: 'BL',
    dialCode: '+590',
    name: 'Saint Barthelemy',
  },
  {
    code: 'SH',
    dialCode: '+290',
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
  },
  {
    code: 'KN',
    dialCode: '+1869',
    name: 'Saint Kitts and Nevis',
  },
  {
    code: 'LC',
    dialCode: '+1758',
    name: 'Saint Lucia',
  },
  {
    code: 'MF',
    dialCode: '+590',
    name: 'Saint Martin',
  },
  {
    code: 'PM',
    dialCode: '+508',
    name: 'Saint Pierre and Miquelon',
  },
  {
    code: 'VC',
    dialCode: '+1784',
    name: 'Saint Vincent and the Grenadines',
  },
  {
    code: 'WS',
    dialCode: '+685',
    name: 'Samoa',
  },
  {
    code: 'SM',
    dialCode: '+378',
    name: 'San Marino',
  },
  {
    code: 'ST',
    dialCode: '+239',
    name: 'Sao Tome and Principe',
  },
  {
    code: 'SA',
    dialCode: '+966',
    name: 'Saudi Arabia',
  },
  {
    code: 'SN',
    dialCode: '+221',
    name: 'Senegal',
  },
  {
    code: 'RS',
    dialCode: '+381',
    name: 'Serbia',
  },
  {
    code: 'SC',
    dialCode: '+248',
    name: 'Seychelles',
  },
  {
    code: 'SL',
    dialCode: '+232',
    name: 'Sierra Leone',
  },
  {
    code: 'SG',
    dialCode: '+65',
    name: 'Singapore',
  },
  {
    code: 'SK',
    dialCode: '+421',
    name: 'Slovakia',
  },
  {
    code: 'SI',
    dialCode: '+386',
    name: 'Slovenia',
  },
  {
    code: 'SB',
    dialCode: '+677',
    name: 'Solomon Islands',
  },
  {
    code: 'SO',
    dialCode: '+252',
    name: 'Somalia',
  },
  {
    code: 'ZA',
    dialCode: '+27',
    name: 'South Africa',
  },
  {
    code: 'SS',
    dialCode: '+211',
    name: 'South Sudan',
  },
  {
    code: 'GS',
    dialCode: '+500',
    name: 'South Georgia and the South Sandwich Islands',
  },
  {
    code: 'ES',
    dialCode: '+34',
    name: 'Spain',
  },
  {
    code: 'LK',
    dialCode: '+94',
    name: 'Sri Lanka',
  },
  {
    code: 'SD',
    dialCode: '+249',
    name: 'Sudan',
  },
  {
    code: 'SR',
    dialCode: '+597',
    name: 'Suriname',
  },
  {
    code: 'SJ',
    dialCode: '+47',
    name: 'Svalbard and Jan Mayen',
  },
  {
    code: 'SZ',
    dialCode: '+268',
    name: 'Swaziland',
  },
  {
    code: 'SE',
    dialCode: '+46',
    name: 'Sweden',
  },
  {
    code: 'CH',
    dialCode: '+41',
    name: 'Switzerland',
  },
  {
    code: 'SY',
    dialCode: '+963',
    name: 'Syrian Arab Republic',
  },
  {
    code: 'TW',
    dialCode: '+886',
    name: 'Taiwan',
  },
  {
    code: 'TJ',
    dialCode: '+992',
    name: 'Tajikistan',
  },
  {
    code: 'TZ',
    dialCode: '+255',
    name: 'Tanzania, United Republic of Tanzania',
  },
  {
    code: 'TH',
    dialCode: '+66',
    name: 'Thailand',
  },
  {
    code: 'TL',
    dialCode: '+670',
    name: 'Timor-Leste',
  },
  {
    code: 'TG',
    dialCode: '+228',
    name: 'Togo',
  },
  {
    code: 'TK',
    dialCode: '+690',
    name: 'Tokelau',
  },
  {
    code: 'TO',
    dialCode: '+676',
    name: 'Tonga',
  },
  {
    code: 'TT',
    dialCode: '+1868',
    name: 'Trinidad and Tobago',
  },
  {
    code: 'TN',
    dialCode: '+216',
    name: 'Tunisia',
  },
  {
    code: 'TR',
    dialCode: '+90',
    name: 'Turkey',
  },
  {
    code: 'TM',
    dialCode: '+993',
    name: 'Turkmenistan',
  },
  {
    code: 'TC',
    dialCode: '+1649',
    name: 'Turks and Caicos Islands',
  },
  {
    code: 'TV',
    dialCode: '+688',
    name: 'Tuvalu',
  },
  {
    code: 'UG',
    dialCode: '+256',
    name: 'Uganda',
  },
  {
    code: 'UA',
    dialCode: '+380',
    name: 'Ukraine',
  },
  {
    code: 'AE',
    dialCode: '+971',
    name: 'United Arab Emirates',
  },
  {
    code: 'GB',
    dialCode: '+44',
    name: 'United Kingdom',
  },
  {
    code: 'US',
    dialCode: '+1',
    name: 'United States',
  },
  {
    code: 'UY',
    dialCode: '+598',
    name: 'Uruguay',
  },
  {
    code: 'UZ',
    dialCode: '+998',
    name: 'Uzbekistan',
  },
  {
    code: 'VU',
    dialCode: '+678',
    name: 'Vanuatu',
  },
  {
    code: 'VE',
    dialCode: '+58',
    name: 'Venezuela, Bolivarian Republic of Venezuela',
  },
  {
    code: 'VN',
    dialCode: '+84',
    name: 'Vietnam',
  },
  {
    code: 'VG',
    dialCode: '+1284',
    name: 'Virgin Islands, British',
  },
  {
    code: 'VI',
    dialCode: '+1340',
    name: 'Virgin Islands, U.S.',
  },
  {
    code: 'WF',
    dialCode: '+681',
    name: 'Wallis and Futuna',
  },
  {
    code: 'YE',
    dialCode: '+967',
    name: 'Yemen',
  },
  {
    code: 'ZM',
    dialCode: '+260',
    name: 'Zambia',
  },
  {
    code: 'ZW',
    dialCode: '+263',
    name: 'Zimbabwe',
  },
];
