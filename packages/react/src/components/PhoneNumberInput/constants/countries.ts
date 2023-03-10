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
  code: string;
  dial_code: string;
  name: string;
}

export const countries: Country[] = [
  {
    code: 'AF',
    dial_code: '+93',
    name: 'Afghanistan',
  },
  {
    code: 'AX',
    dial_code: '+358',
    name: 'Aland Islands',
  },
  {
    code: 'AL',
    dial_code: '+355',
    name: 'Albania',
  },
  {
    code: 'DZ',
    dial_code: '+213',
    name: 'Algeria',
  },
  {
    code: 'AS',
    dial_code: '+1684',
    name: 'AmericanSamoa',
  },
  {
    code: 'AD',
    dial_code: '+376',
    name: 'Andorra',
  },
  {
    code: 'AO',
    dial_code: '+244',
    name: 'Angola',
  },
  {
    code: 'AI',
    dial_code: '+1264',
    name: 'Anguilla',
  },
  {
    code: 'AQ',
    dial_code: '+672',
    name: 'Antarctica',
  },
  {
    code: 'AG',
    dial_code: '+1268',
    name: 'Antigua and Barbuda',
  },
  {
    code: 'AR',
    dial_code: '+54',
    name: 'Argentina',
  },
  {
    code: 'AM',
    dial_code: '+374',
    name: 'Armenia',
  },
  {
    code: 'AW',
    dial_code: '+297',
    name: 'Aruba',
  },
  {
    code: 'AU',
    dial_code: '+61',
    name: 'Australia',
  },
  {
    code: 'AT',
    dial_code: '+43',
    name: 'Austria',
  },
  {
    code: 'AZ',
    dial_code: '+994',
    name: 'Azerbaijan',
  },
  {
    code: 'BS',
    dial_code: '+1242',
    name: 'Bahamas',
  },
  {
    code: 'BH',
    dial_code: '+973',
    name: 'Bahrain',
  },
  {
    code: 'BD',
    dial_code: '+880',
    name: 'Bangladesh',
  },
  {
    code: 'BB',
    dial_code: '+1246',
    name: 'Barbados',
  },
  {
    code: 'BY',
    dial_code: '+375',
    name: 'Belarus',
  },
  {
    code: 'BE',
    dial_code: '+32',
    name: 'Belgium',
  },
  {
    code: 'BZ',
    dial_code: '+501',
    name: 'Belize',
  },
  {
    code: 'BJ',
    dial_code: '+229',
    name: 'Benin',
  },
  {
    code: 'BM',
    dial_code: '+1441',
    name: 'Bermuda',
  },
  {
    code: 'BT',
    dial_code: '+975',
    name: 'Bhutan',
  },
  {
    code: 'BO',
    dial_code: '+591',
    name: 'Bolivia, Plurinational State of',
  },
  {
    code: 'BA',
    dial_code: '+387',
    name: 'Bosnia and Herzegovina',
  },
  {
    code: 'BW',
    dial_code: '+267',
    name: 'Botswana',
  },
  {
    code: 'BR',
    dial_code: '+55',
    name: 'Brazil',
  },
  {
    code: 'IO',
    dial_code: '+246',
    name: 'British Indian Ocean Territory',
  },
  {
    code: 'BN',
    dial_code: '+673',
    name: 'Brunei Darussalam',
  },
  {
    code: 'BG',
    dial_code: '+359',
    name: 'Bulgaria',
  },
  {
    code: 'BF',
    dial_code: '+226',
    name: 'Burkina Faso',
  },
  {
    code: 'BI',
    dial_code: '+257',
    name: 'Burundi',
  },
  {
    code: 'KH',
    dial_code: '+855',
    name: 'Cambodia',
  },
  {
    code: 'CM',
    dial_code: '+237',
    name: 'Cameroon',
  },
  {
    code: 'CA',
    dial_code: '+1',
    name: 'Canada',
  },
  {
    code: 'CV',
    dial_code: '+238',
    name: 'Cape Verde',
  },
  {
    code: 'KY',
    dial_code: '+345',
    name: 'Cayman Islands',
  },
  {
    code: 'CF',
    dial_code: '+236',
    name: 'Central African Republic',
  },
  {
    code: 'TD',
    dial_code: '+235',
    name: 'Chad',
  },
  {
    code: 'CL',
    dial_code: '+56',
    name: 'Chile',
  },
  {
    code: 'CN',
    dial_code: '+86',
    name: 'China',
  },
  {
    code: 'CX',
    dial_code: '+61',
    name: 'Christmas Island',
  },
  {
    code: 'CC',
    dial_code: '+61',
    name: 'Cocos (Keeling) Islands',
  },
  {
    code: 'CO',
    dial_code: '+57',
    name: 'Colombia',
  },
  {
    code: 'KM',
    dial_code: '+269',
    name: 'Comoros',
  },
  {
    code: 'CG',
    dial_code: '+242',
    name: 'Congo',
  },
  {
    code: 'CD',
    dial_code: '+243',
    name: 'Congo, The Democratic Republic of the Congo',
  },
  {
    code: 'CK',
    dial_code: '+682',
    name: 'Cook Islands',
  },
  {
    code: 'CR',
    dial_code: '+506',
    name: 'Costa Rica',
  },
  {
    code: 'CI',
    dial_code: '+225',
    name: "Cote d'Ivoire",
  },
  {
    code: 'HR',
    dial_code: '+385',
    name: 'Croatia',
  },
  {
    code: 'CU',
    dial_code: '+53',
    name: 'Cuba',
  },
  {
    code: 'CY',
    dial_code: '+357',
    name: 'Cyprus',
  },
  {
    code: 'CZ',
    dial_code: '+420',
    name: 'Czech Republic',
  },
  {
    code: 'DK',
    dial_code: '+45',
    name: 'Denmark',
  },
  {
    code: 'DJ',
    dial_code: '+253',
    name: 'Djibouti',
  },
  {
    code: 'DM',
    dial_code: '+1767',
    name: 'Dominica',
  },
  {
    code: 'DO',
    dial_code: '+1849',
    name: 'Dominican Republic',
  },
  {
    code: 'EC',
    dial_code: '+593',
    name: 'Ecuador',
  },
  {
    code: 'EG',
    dial_code: '+20',
    name: 'Egypt',
  },
  {
    code: 'SV',
    dial_code: '+503',
    name: 'El Salvador',
  },
  {
    code: 'GQ',
    dial_code: '+240',
    name: 'Equatorial Guinea',
  },
  {
    code: 'ER',
    dial_code: '+291',
    name: 'Eritrea',
  },
  {
    code: 'EE',
    dial_code: '+372',
    name: 'Estonia',
  },
  {
    code: 'ET',
    dial_code: '+251',
    name: 'Ethiopia',
  },
  {
    code: 'FK',
    dial_code: '+500',
    name: 'Falkland Islands (Malvinas)',
  },
  {
    code: 'FO',
    dial_code: '+298',
    name: 'Faroe Islands',
  },
  {
    code: 'FJ',
    dial_code: '+679',
    name: 'Fiji',
  },
  {
    code: 'FI',
    dial_code: '+358',
    name: 'Finland',
  },
  {
    code: 'FR',
    dial_code: '+33',
    name: 'France',
  },
  {
    code: 'GF',
    dial_code: '+594',
    name: 'French Guiana',
  },
  {
    code: 'PF',
    dial_code: '+689',
    name: 'French Polynesia',
  },
  {
    code: 'GA',
    dial_code: '+241',
    name: 'Gabon',
  },
  {
    code: 'GM',
    dial_code: '+220',
    name: 'Gambia',
  },
  {
    code: 'GE',
    dial_code: '+995',
    name: 'Georgia',
  },
  {
    code: 'DE',
    dial_code: '+49',
    name: 'Germany',
  },
  {
    code: 'GH',
    dial_code: '+233',
    name: 'Ghana',
  },
  {
    code: 'GI',
    dial_code: '+350',
    name: 'Gibraltar',
  },
  {
    code: 'GR',
    dial_code: '+30',
    name: 'Greece',
  },
  {
    code: 'GL',
    dial_code: '+299',
    name: 'Greenland',
  },
  {
    code: 'GD',
    dial_code: '+1473',
    name: 'Grenada',
  },
  {
    code: 'GP',
    dial_code: '+590',
    name: 'Guadeloupe',
  },
  {
    code: 'GU',
    dial_code: '+1671',
    name: 'Guam',
  },
  {
    code: 'GT',
    dial_code: '+502',
    name: 'Guatemala',
  },
  {
    code: 'GG',
    dial_code: '+44',
    name: 'Guernsey',
  },
  {
    code: 'GN',
    dial_code: '+224',
    name: 'Guinea',
  },
  {
    code: 'GW',
    dial_code: '+245',
    name: 'Guinea-Bissau',
  },
  {
    code: 'GY',
    dial_code: '+592',
    name: 'Guyana',
  },
  {
    code: 'HT',
    dial_code: '+509',
    name: 'Haiti',
  },
  {
    code: 'VA',
    dial_code: '+379',
    name: 'Holy See (Vatican City State)',
  },
  {
    code: 'HN',
    dial_code: '+504',
    name: 'Honduras',
  },
  {
    code: 'HK',
    dial_code: '+852',
    name: 'Hong Kong',
  },
  {
    code: 'HU',
    dial_code: '+36',
    name: 'Hungary',
  },
  {
    code: 'IS',
    dial_code: '+354',
    name: 'Iceland',
  },
  {
    code: 'IN',
    dial_code: '+91',
    name: 'India',
  },
  {
    code: 'ID',
    dial_code: '+62',
    name: 'Indonesia',
  },
  {
    code: 'IR',
    dial_code: '+98',
    name: 'Iran, Islamic Republic of Persian Gulf',
  },
  {
    code: 'IQ',
    dial_code: '+964',
    name: 'Iraq',
  },
  {
    code: 'IE',
    dial_code: '+353',
    name: 'Ireland',
  },
  {
    code: 'IM',
    dial_code: '+44',
    name: 'Isle of Man',
  },
  {
    code: 'IL',
    dial_code: '+972',
    name: 'Israel',
  },
  {
    code: 'IT',
    dial_code: '+39',
    name: 'Italy',
  },
  {
    code: 'JM',
    dial_code: '+1876',
    name: 'Jamaica',
  },
  {
    code: 'JP',
    dial_code: '+81',
    name: 'Japan',
  },
  {
    code: 'JE',
    dial_code: '+44',
    name: 'Jersey',
  },
  {
    code: 'JO',
    dial_code: '+962',
    name: 'Jordan',
  },
  {
    code: 'KZ',
    dial_code: '+7',
    name: 'Kazakhstan',
  },
  {
    code: 'KE',
    dial_code: '+254',
    name: 'Kenya',
  },
  {
    code: 'KI',
    dial_code: '+686',
    name: 'Kiribati',
  },
  {
    code: 'KP',
    dial_code: '+850',
    name: "Korea, Democratic People's Republic of Korea",
  },
  {
    code: 'KR',
    dial_code: '+82',
    name: 'Korea, Republic of South Korea',
  },
  {
    code: 'KW',
    dial_code: '+965',
    name: 'Kuwait',
  },
  {
    code: 'KG',
    dial_code: '+996',
    name: 'Kyrgyzstan',
  },
  {
    code: 'LA',
    dial_code: '+856',
    name: 'Laos',
  },
  {
    code: 'LV',
    dial_code: '+371',
    name: 'Latvia',
  },
  {
    code: 'LB',
    dial_code: '+961',
    name: 'Lebanon',
  },
  {
    code: 'LS',
    dial_code: '+266',
    name: 'Lesotho',
  },
  {
    code: 'LR',
    dial_code: '+231',
    name: 'Liberia',
  },
  {
    code: 'LY',
    dial_code: '+218',
    name: 'Libyan Arab Jamahiriya',
  },
  {
    code: 'LI',
    dial_code: '+423',
    name: 'Liechtenstein',
  },
  {
    code: 'LT',
    dial_code: '+370',
    name: 'Lithuania',
  },
  {
    code: 'LU',
    dial_code: '+352',
    name: 'Luxembourg',
  },
  {
    code: 'MO',
    dial_code: '+853',
    name: 'Macao',
  },
  {
    code: 'MK',
    dial_code: '+389',
    name: 'Macedonia',
  },
  {
    code: 'MG',
    dial_code: '+261',
    name: 'Madagascar',
  },
  {
    code: 'MW',
    dial_code: '+265',
    name: 'Malawi',
  },
  {
    code: 'MY',
    dial_code: '+60',
    name: 'Malaysia',
  },
  {
    code: 'MV',
    dial_code: '+960',
    name: 'Maldives',
  },
  {
    code: 'ML',
    dial_code: '+223',
    name: 'Mali',
  },
  {
    code: 'MT',
    dial_code: '+356',
    name: 'Malta',
  },
  {
    code: 'MH',
    dial_code: '+692',
    name: 'Marshall Islands',
  },
  {
    code: 'MQ',
    dial_code: '+596',
    name: 'Martinique',
  },
  {
    code: 'MR',
    dial_code: '+222',
    name: 'Mauritania',
  },
  {
    code: 'MU',
    dial_code: '+230',
    name: 'Mauritius',
  },
  {
    code: 'YT',
    dial_code: '+262',
    name: 'Mayotte',
  },
  {
    code: 'MX',
    dial_code: '+52',
    name: 'Mexico',
  },
  {
    code: 'FM',
    dial_code: '+691',
    name: 'Micronesia, Federated States of Micronesia',
  },
  {
    code: 'MD',
    dial_code: '+373',
    name: 'Moldova',
  },
  {
    code: 'MC',
    dial_code: '+377',
    name: 'Monaco',
  },
  {
    code: 'MN',
    dial_code: '+976',
    name: 'Mongolia',
  },
  {
    code: 'ME',
    dial_code: '+382',
    name: 'Montenegro',
  },
  {
    code: 'MS',
    dial_code: '+1664',
    name: 'Montserrat',
  },
  {
    code: 'MA',
    dial_code: '+212',
    name: 'Morocco',
  },
  {
    code: 'MZ',
    dial_code: '+258',
    name: 'Mozambique',
  },
  {
    code: 'MM',
    dial_code: '+95',
    name: 'Myanmar',
  },
  {
    code: 'NA',
    dial_code: '+264',
    name: 'Namibia',
  },
  {
    code: 'NR',
    dial_code: '+674',
    name: 'Nauru',
  },
  {
    code: 'NP',
    dial_code: '+977',
    name: 'Nepal',
  },
  {
    code: 'NL',
    dial_code: '+31',
    name: 'Netherlands',
  },
  {
    code: 'AN',
    dial_code: '+599',
    name: 'Netherlands Antilles',
  },
  {
    code: 'NC',
    dial_code: '+687',
    name: 'New Caledonia',
  },
  {
    code: 'NZ',
    dial_code: '+64',
    name: 'New Zealand',
  },
  {
    code: 'NI',
    dial_code: '+505',
    name: 'Nicaragua',
  },
  {
    code: 'NE',
    dial_code: '+227',
    name: 'Niger',
  },
  {
    code: 'NG',
    dial_code: '+234',
    name: 'Nigeria',
  },
  {
    code: 'NU',
    dial_code: '+683',
    name: 'Niue',
  },
  {
    code: 'NF',
    dial_code: '+672',
    name: 'Norfolk Island',
  },
  {
    code: 'MP',
    dial_code: '+1670',
    name: 'Northern Mariana Islands',
  },
  {
    code: 'NO',
    dial_code: '+47',
    name: 'Norway',
  },
  {
    code: 'OM',
    dial_code: '+968',
    name: 'Oman',
  },
  {
    code: 'PK',
    dial_code: '+92',
    name: 'Pakistan',
  },
  {
    code: 'PW',
    dial_code: '+680',
    name: 'Palau',
  },
  {
    code: 'PS',
    dial_code: '+970',
    name: 'Palestinian Territory, Occupied',
  },
  {
    code: 'PA',
    dial_code: '+507',
    name: 'Panama',
  },
  {
    code: 'PG',
    dial_code: '+675',
    name: 'Papua New Guinea',
  },
  {
    code: 'PY',
    dial_code: '+595',
    name: 'Paraguay',
  },
  {
    code: 'PE',
    dial_code: '+51',
    name: 'Peru',
  },
  {
    code: 'PH',
    dial_code: '+63',
    name: 'Philippines',
  },
  {
    code: 'PN',
    dial_code: '+872',
    name: 'Pitcairn',
  },
  {
    code: 'PL',
    dial_code: '+48',
    name: 'Poland',
  },
  {
    code: 'PT',
    dial_code: '+351',
    name: 'Portugal',
  },
  {
    code: 'PR',
    dial_code: '+1939',
    name: 'Puerto Rico',
  },
  {
    code: 'QA',
    dial_code: '+974',
    name: 'Qatar',
  },
  {
    code: 'RO',
    dial_code: '+40',
    name: 'Romania',
  },
  {
    code: 'RU',
    dial_code: '+7',
    name: 'Russia',
  },
  {
    code: 'RW',
    dial_code: '+250',
    name: 'Rwanda',
  },
  {
    code: 'RE',
    dial_code: '+262',
    name: 'Reunion',
  },
  {
    code: 'BL',
    dial_code: '+590',
    name: 'Saint Barthelemy',
  },
  {
    code: 'SH',
    dial_code: '+290',
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
  },
  {
    code: 'KN',
    dial_code: '+1869',
    name: 'Saint Kitts and Nevis',
  },
  {
    code: 'LC',
    dial_code: '+1758',
    name: 'Saint Lucia',
  },
  {
    code: 'MF',
    dial_code: '+590',
    name: 'Saint Martin',
  },
  {
    code: 'PM',
    dial_code: '+508',
    name: 'Saint Pierre and Miquelon',
  },
  {
    code: 'VC',
    dial_code: '+1784',
    name: 'Saint Vincent and the Grenadines',
  },
  {
    code: 'WS',
    dial_code: '+685',
    name: 'Samoa',
  },
  {
    code: 'SM',
    dial_code: '+378',
    name: 'San Marino',
  },
  {
    code: 'ST',
    dial_code: '+239',
    name: 'Sao Tome and Principe',
  },
  {
    code: 'SA',
    dial_code: '+966',
    name: 'Saudi Arabia',
  },
  {
    code: 'SN',
    dial_code: '+221',
    name: 'Senegal',
  },
  {
    code: 'RS',
    dial_code: '+381',
    name: 'Serbia',
  },
  {
    code: 'SC',
    dial_code: '+248',
    name: 'Seychelles',
  },
  {
    code: 'SL',
    dial_code: '+232',
    name: 'Sierra Leone',
  },
  {
    code: 'SG',
    dial_code: '+65',
    name: 'Singapore',
  },
  {
    code: 'SK',
    dial_code: '+421',
    name: 'Slovakia',
  },
  {
    code: 'SI',
    dial_code: '+386',
    name: 'Slovenia',
  },
  {
    code: 'SB',
    dial_code: '+677',
    name: 'Solomon Islands',
  },
  {
    code: 'SO',
    dial_code: '+252',
    name: 'Somalia',
  },
  {
    code: 'ZA',
    dial_code: '+27',
    name: 'South Africa',
  },
  {
    code: 'SS',
    dial_code: '+211',
    name: 'South Sudan',
  },
  {
    code: 'GS',
    dial_code: '+500',
    name: 'South Georgia and the South Sandwich Islands',
  },
  {
    code: 'ES',
    dial_code: '+34',
    name: 'Spain',
  },
  {
    code: 'LK',
    dial_code: '+94',
    name: 'Sri Lanka',
  },
  {
    code: 'SD',
    dial_code: '+249',
    name: 'Sudan',
  },
  {
    code: 'SR',
    dial_code: '+597',
    name: 'Suriname',
  },
  {
    code: 'SJ',
    dial_code: '+47',
    name: 'Svalbard and Jan Mayen',
  },
  {
    code: 'SZ',
    dial_code: '+268',
    name: 'Swaziland',
  },
  {
    code: 'SE',
    dial_code: '+46',
    name: 'Sweden',
  },
  {
    code: 'CH',
    dial_code: '+41',
    name: 'Switzerland',
  },
  {
    code: 'SY',
    dial_code: '+963',
    name: 'Syrian Arab Republic',
  },
  {
    code: 'TW',
    dial_code: '+886',
    name: 'Taiwan',
  },
  {
    code: 'TJ',
    dial_code: '+992',
    name: 'Tajikistan',
  },
  {
    code: 'TZ',
    dial_code: '+255',
    name: 'Tanzania, United Republic of Tanzania',
  },
  {
    code: 'TH',
    dial_code: '+66',
    name: 'Thailand',
  },
  {
    code: 'TL',
    dial_code: '+670',
    name: 'Timor-Leste',
  },
  {
    code: 'TG',
    dial_code: '+228',
    name: 'Togo',
  },
  {
    code: 'TK',
    dial_code: '+690',
    name: 'Tokelau',
  },
  {
    code: 'TO',
    dial_code: '+676',
    name: 'Tonga',
  },
  {
    code: 'TT',
    dial_code: '+1868',
    name: 'Trinidad and Tobago',
  },
  {
    code: 'TN',
    dial_code: '+216',
    name: 'Tunisia',
  },
  {
    code: 'TR',
    dial_code: '+90',
    name: 'Turkey',
  },
  {
    code: 'TM',
    dial_code: '+993',
    name: 'Turkmenistan',
  },
  {
    code: 'TC',
    dial_code: '+1649',
    name: 'Turks and Caicos Islands',
  },
  {
    code: 'TV',
    dial_code: '+688',
    name: 'Tuvalu',
  },
  {
    code: 'UG',
    dial_code: '+256',
    name: 'Uganda',
  },
  {
    code: 'UA',
    dial_code: '+380',
    name: 'Ukraine',
  },
  {
    code: 'AE',
    dial_code: '+971',
    name: 'United Arab Emirates',
  },
  {
    code: 'GB',
    dial_code: '+44',
    name: 'United Kingdom',
  },
  {
    code: 'US',
    dial_code: '+1',
    name: 'United States',
  },
  {
    code: 'UY',
    dial_code: '+598',
    name: 'Uruguay',
  },
  {
    code: 'UZ',
    dial_code: '+998',
    name: 'Uzbekistan',
  },
  {
    code: 'VU',
    dial_code: '+678',
    name: 'Vanuatu',
  },
  {
    code: 'VE',
    dial_code: '+58',
    name: 'Venezuela, Bolivarian Republic of Venezuela',
  },
  {
    code: 'VN',
    dial_code: '+84',
    name: 'Vietnam',
  },
  {
    code: 'VG',
    dial_code: '+1284',
    name: 'Virgin Islands, British',
  },
  {
    code: 'VI',
    dial_code: '+1340',
    name: 'Virgin Islands, U.S.',
  },
  {
    code: 'WF',
    dial_code: '+681',
    name: 'Wallis and Futuna',
  },
  {
    code: 'YE',
    dial_code: '+967',
    name: 'Yemen',
  },
  {
    code: 'ZM',
    dial_code: '+260',
    name: 'Zambia',
  },
  {
    code: 'ZW',
    dial_code: '+263',
    name: 'Zimbabwe',
  },
];
