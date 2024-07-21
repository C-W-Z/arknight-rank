export interface StarProps {
    num: number;
    color: string;
}

export function Star({ num, color }: StarProps) {
    const paths = [];
    for (let i = 0; i < num; i++) {
        paths.push(
            <path key={i} d="m 44.481566,141.92229 -2.013876,-2.59033 -2.970944,1.39247 1.841227,-2.71576 -2.242396,-2.39524 3.151817,0.9119 1.585067,-2.87282 0.106703,3.27935 3.222022,0.61974 -3.085871,1.11485 z" transform={`matrix(0.88659483,0,0,0.90493954,${5.1123309 + i * 5.5842171},7.0009893)`} />
        );
    }

    return (
        <svg className="star" fill={color} xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${7.1509285 + (num - 1) * 5.5842171} 7.4836426`}>
            <g transform="translate(-39.774266,-127.94844)">
                {paths}
            </g>
        </svg>
    )
}

export function LessThan() {
    return (
        <svg className="less-than" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z" />
        </svg>
    )
}

export function HomeIcon() {
    return (
        <svg className='home-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124.75164 93.78463">
            <path
                d="m 17.451521,74.734624 0.10352,-19.050004 22.36571,-18.17949 22.36572,-18.17949 22.365722,18.17949 22.365717,18.17949 0.10352,19.050004 0.10351,19.049998 H 89.640323 72.055701 v -12.699998 -12.7 h -9.76923 -9.76923 v 12.7 12.699998 H 34.932621 17.348011 Z M 1.6276808,52.58651 C 0.42819083,50.34524 -0.26216917,48.29423 0.09355083,48.0287 0.44927083,47.76318 13.606461,36.84809 29.331751,23.77296 47.086401,9.010476 59.576961,0 62.286471,0 c 2.70951,0 15.20007,9.010476 32.954722,23.77296 15.725297,13.07513 28.882487,23.99022 29.238207,24.25574 1.55837,1.16324 -3.9759,8.632844 -6.39612,8.632844 -1.4746,0 -14.27393,-9.671544 -28.442957,-21.492314 C 75.471301,23.34846 63.162071,13.676923 62.286471,13.676923 c -0.8756,0 -13.18483,9.671537 -27.35385,21.492307 C 20.763601,46.99 7.9642809,56.661544 6.4896708,56.661544 c -1.4746,0 -3.6625,-1.833764 -4.86199,-4.075034 z"
                id="path248" />
        </svg>
    )
}

export function MeshSphere() {
    return (
        <svg className='mesh-sphere' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <g transform="translate(0,300) scale(0.05,-0.05)" stroke="none">
                <path d="M2658 5273 c-18 -39 -76 -65 -315 -143 -161 -53 -284 -99 -272 -103
11 -4 114 24 228 63 245 82 271 81 86 -5 -163 -76 -346 -103 -384 -56 -58 70
-179 3 -148 -81 13 -33 -268 -258 -325 -260 -89 -4 -125 -148 -37 -148 18 0
-16 -48 -82 -115 -62 -63 -121 -113 -131 -110 -10 3 -64 -57 -119 -133 -79
-107 -109 -136 -140 -128 -92 24 -128 -80 -59 -169 23 -29 40 -39 40 -23 1 52
39 -28 40 -82 0 -27 13 -86 29 -130 27 -76 26 -82 -15 -116 l-44 -37 44 22
c48 23 49 21 124 -265 22 -85 19 -85 -106 25 -32 28 -51 38 -41 21 9 -16 55
-65 103 -107 47 -42 87 -91 87 -110 1 -18 19 -82 40 -143 39 -113 43 -45 6
100 l-13 50 59 -55 c33 -30 65 -55 72 -55 8 0 -22 34 -65 75 -70 66 -86 100
-137 291 l-58 216 73 53 c185 135 284 212 295 230 16 26 -76 -34 -231 -149
-70 -52 -134 -91 -142 -86 -36 22 -41 150 -8 204 l33 56 -40 -48 -39 -47 -14
53 c-9 35 -3 64 16 82 15 16 32 39 36 51 4 12 88 39 187 59 98 21 256 56 349
79 222 53 222 53 113 -32 -51 -40 -93 -76 -93 -80 0 -17 87 39 157 102 40 36
100 75 133 87 100 35 2 27 -180 -16 -223 -52 -210 -56 -212 65 -2 58 -10 132
-20 165 -11 39 -13 0 -7 -110 l10 -170 -144 -35 c-179 -43 -175 -50 -80 138
103 204 315 451 456 530 114 65 149 100 45 46 l-63 -32 56 73 c43 56 67 71
103 64 33 -6 59 6 84 38 28 36 62 49 144 56 112 9 274 27 403 43 l76 10 -48
-96 c-65 -128 -113 -245 -101 -245 5 0 46 76 91 168 l80 168 124 15 c67 8 159
17 203 20 44 3 94 10 110 16 82 28 84 32 10 26 -51 -5 -108 7 -155 30 -85 43
-104 33 -20 -10 53 -28 51 -29 -80 -43 -74 -8 -147 -10 -162 -4 -16 6 -36 3
-46 -6 -9 -9 -75 -22 -147 -28 l-130 -13 100 53 c55 30 122 70 148 91 34 26
55 32 69 18 26 -26 99 -27 124 -2 13 13 59 9 129 -9 126 -34 180 -37 180 -12
0 9 -64 27 -142 38 -106 16 -150 32 -171 63 -39 55 -103 52 -129 -6z m-992
-564 c-41 -50 -79 -81 -83 -69 -6 18 127 156 153 159 3 1 -28 -40 -70 -90z
m-395 -547 c-53 -105 -82 -140 -122 -151 -105 -26 -96 -8 110 214 38 41 72 75
75 75 4 0 -25 -62 -63 -138z"/>
                <path d="M3224 5189 c-75 -53 -45 -149 48 -149 91 0 115 100 37 152 -35 23
-47 23 -85 -3z"/>
                <path d="M3450 5121 c-38 -15 -37 -17 10 -28 101 -23 340 -53 428 -53 69 0
103 -12 145 -51 30 -28 67 -46 82 -40 16 6 95 -60 197 -164 94 -96 161 -157
151 -135 -11 22 -84 103 -161 180 -102 101 -138 150 -130 176 23 74 -89 131
-126 65 -15 -26 -45 -24 -236 11 -121 22 -245 35 -276 29 -34 -6 -51 -3 -44 9
14 23 14 23 -40 1z"/>
                <path d="M3380 5070 c0 -6 63 -38 140 -73 78 -34 136 -68 130 -74 -6 -6 27
-21 74 -34 144 -40 485 -206 500 -244 7 -19 29 -78 47 -130 19 -53 38 -93 42
-89 4 4 -11 59 -32 122 l-40 114 45 -13 c24 -8 70 -27 101 -43 31 -16 62 -24
68 -17 7 6 -44 35 -112 64 -109 48 -126 62 -146 130 -13 43 -28 73 -33 68 -5
-5 1 -35 12 -68 l20 -59 -208 92 c-229 101 -242 113 -136 133 40 7 68 18 62
23 -5 5 -49 0 -97 -12 -92 -24 -107 -20 -362 89 -41 17 -75 27 -75 21z"/>
                <path d="M2920 4868 c-134 -105 -272 -204 -307 -219 -35 -15 -51 -28 -37 -28
28 -1 -42 -64 -222 -200 -63 -48 -121 -96 -128 -107 -15 -25 21 -5 108 59 l64
47 7 -95 8 -95 4 110 c6 146 71 206 159 147 107 -71 684 -374 684 -359 0 15
-216 140 -476 277 l-245 129 69 53 c48 37 155 75 356 125 282 72 382 106 314
107 -17 1 -125 -25 -240 -56 -299 -83 -315 -86 -277 -57 17 13 98 75 180 137
193 147 267 217 231 217 -5 0 -118 -86 -252 -192z"/>
                <path d="M3321 5017 c-2 -24 236 -550 301 -665 12 -21 38 -76 59 -124 l37 -86
-84 -20 -84 -21 90 10 c104 12 194 -78 131 -130 -52 -44 -346 16 -336 69 10
51 -37 96 -82 78 -18 -7 -33 -30 -33 -52 0 -48 54 -53 -609 61 -438 75 -510
96 -511 148 0 8 -21 20 -48 26 -42 11 -92 147 -92 252 0 10 52 19 115 20 l115
4 -120 11 -120 12 -45 130 c-42 119 -46 99 -12 -60 l12 -60 -167 -2 c-163 -3
-165 -3 -68 -21 55 -9 123 -14 151 -9 28 5 61 3 73 -4 33 -21 96 -265 73 -281
-35 -23 -46 -82 -25 -129 18 -40 -138 -374 -175 -374 -4 0 -41 14 -81 30 -100
42 -105 25 -6 -20 44 -20 80 -39 80 -43 0 -15 -221 -447 -261 -511 l-42 -66
11 300 c7 200 4 273 -8 220 -10 -44 -18 -190 -19 -325 -1 -241 -2 -249 -72
-388 -39 -77 -67 -146 -62 -151 6 -5 30 29 54 77 25 48 50 92 57 97 6 6 93
170 192 365 99 195 187 355 197 355 9 0 79 -28 156 -62 78 -33 144 -57 149
-53 5 5 -57 39 -137 75 -80 36 -149 69 -154 74 -23 19 169 366 203 366 20 0
36 -11 36 -25 0 -14 45 -128 99 -254 87 -201 95 -231 68 -251 -48 -35 -26 -99
36 -106 47 -6 62 -28 119 -170 35 -90 89 -214 119 -275 98 -196 73 -206 -681
-270 -82 -7 -225 -26 -318 -41 -163 -27 -248 -6 -211 53 19 31 -85 4 -116 -29
-67 -73 -8 -182 86 -158 26 7 55 -11 93 -57 31 -37 103 -117 161 -179 77 -81
117 -147 148 -236 48 -144 71 -154 28 -14 l-28 96 192 -205 c106 -112 210
-226 232 -253 l39 -50 -82 42 c-45 23 -94 41 -108 40 -29 -1 162 -97 195 -98
37 0 208 -189 193 -213 -10 -16 -85 -19 -249 -12 l-235 11 -1 72 c-1 40 -10
90 -21 112 -12 27 -14 3 -6 -77 l11 -117 -132 15 c-194 20 -426 255 -430 434
0 41 2 75 5 75 3 0 55 -17 115 -38 60 -21 145 -44 189 -50 92 -14 -58 45 -225
88 l-85 22 -2 234 c-2 129 -1 250 1 269 2 19 -6 35 -18 35 -11 0 -21 -14 -21
-32 0 -17 -17 -56 -37 -85 -57 -80 -129 -229 -104 -214 12 8 46 60 75 117 l54
104 15 -90 c8 -49 15 -188 16 -308 l1 -217 -82 87 -82 88 82 -103 c65 -82 83
-120 85 -190 3 -73 5 -77 11 -22 12 89 25 84 155 -65 l114 -130 -77 0 c-52 0
-88 13 -111 40 -19 22 -50 40 -70 40 -25 1 -57 53 -112 182 -43 99 -91 193
-107 210 -23 23 -25 35 -6 57 41 50 16 120 -45 127 -30 4 -55 18 -55 31 0 13
-50 112 -111 218 -88 155 -107 202 -91 232 15 27 12 49 -10 80 -58 83 -165 32
-140 -67 11 -44 32 -56 86 -48 25 3 244 -451 245 -509 1 -36 14 -60 36 -67 41
-12 270 -461 243 -477 -26 -16 -22 -97 6 -125 37 -37 90 -29 124 19 63 90 215
45 353 -105 64 -70 118 -121 118 -112 1 9 -45 65 -102 125 l-103 109 120 0
119 0 22 -95 22 -95 -9 92 -9 91 222 -9 c295 -12 319 -33 319 -265 0 -87 -4
-159 -9 -159 -5 0 -69 14 -142 31 -73 17 -143 28 -155 24 -12 -4 52 -23 142
-43 160 -35 164 -37 164 -94 0 -88 -46 -91 -166 -12 -58 39 -139 87 -179 106
-52 25 -75 49 -79 86 -5 45 -16 52 -76 52 -49 0 -122 32 -240 103 -203 122
-308 177 -293 152 11 -19 300 -198 407 -252 37 -19 66 -51 70 -78 5 -36 19
-45 67 -45 36 0 112 -31 180 -72 66 -40 148 -88 183 -105 44 -23 65 -49 70
-88 8 -72 100 -89 140 -26 23 37 46 41 246 42 121 1 261 9 310 18 l90 16 -130
5 -130 5 110 15 c61 7 131 21 157 29 41 13 44 10 26 -23 -42 -78 59 -146 116
-77 13 16 21 49 17 75 -5 41 3 46 74 50 l80 5 -70 -30 -70 -29 70 13 c39 6
112 28 164 47 80 30 98 31 118 8 53 -64 162 -12 151 73 -1 16 6 32 17 37 11 4
32 24 46 45 27 38 142 106 156 92 4 -4 -29 -28 -74 -53 -44 -26 -77 -50 -72
-55 9 -8 438 218 486 256 12 9 50 12 83 5 67 -13 117 40 86 91 -11 17 6 59 48
119 36 51 82 118 102 150 l37 57 -46 -27 c-25 -16 -71 -79 -103 -142 -41 -80
-71 -115 -103 -120 -25 -3 -57 -29 -70 -58 -18 -37 -65 -67 -166 -106 -77 -31
-136 -62 -132 -69 5 -7 -14 -13 -40 -13 -37 0 -42 5 -22 20 14 11 67 54 117
95 50 41 102 75 115 75 14 0 20 7 15 15 -5 8 32 47 81 85 50 39 127 104 173
144 46 41 93 75 106 75 12 1 28 15 35 32 6 18 22 25 35 17 15 -9 18 -5 7 12
-12 20 -5 23 30 14 101 -26 159 70 88 148 -29 33 -37 33 -79 6 -81 -53 -256
21 -242 102 11 59 10 59 -12 10 -13 -27 -24 -52 -26 -55 -1 -3 -31 5 -65 17
l-63 22 53 73 54 73 -70 -65 -70 -65 -124 42 c-188 63 -187 97 9 297 l156 161
47 -92 c60 -119 80 -102 22 18 l-45 91 146 162 c177 196 179 195 105 -52 -73
-240 -93 -331 -64 -284 11 18 53 149 93 290 83 293 203 479 295 456 68 -17
125 56 96 121 -44 97 -182 45 -156 -58 13 -54 -104 -171 -130 -129 -7 11 -19
-5 -27 -36 -20 -80 -391 -467 -391 -408 0 27 -221 481 -234 481 -17 0 21 -94
127 -308 l107 -219 -134 -141 c-73 -78 -148 -158 -167 -179 -47 -51 -99 3 -99
103 0 40 -15 173 -33 294 l-33 220 63 125 c77 151 68 167 -11 22 l-56 -104
-14 129 c-9 77 -7 131 4 135 11 3 6 20 -10 36 -17 16 -30 58 -30 93 0 35 -6
85 -13 111 -11 39 3 31 70 -40 45 -48 82 -80 82 -72 1 9 -35 55 -80 104 -70
76 -84 107 -102 224 -27 177 -46 194 -31 29 l11 -127 -98 96 -99 97 53 55 c40
42 61 51 87 37 23 -12 46 -10 70 8 31 22 55 14 176 -60 77 -48 148 -89 159
-93 11 -4 5 -72 -14 -163 -18 -87 -28 -161 -23 -167 10 -9 37 85 66 226 l16
82 300 -167 c216 -120 302 -178 307 -208 8 -55 59 -71 99 -30 43 43 8 105 -54
96 -23 -4 -67 11 -97 31 -30 21 -165 99 -300 174 -135 75 -245 143 -245 152 0
9 13 73 28 143 41 184 54 292 33 257 -10 -16 -34 -113 -53 -215 -20 -103 -41
-184 -47 -181 -254 126 -296 155 -308 214 -9 48 -25 64 -70 73 -48 10 -123 99
-99 118 18 13 365 67 379 58 10 -6 91 55 180 136 125 113 175 146 222 146 114
0 128 130 15 147 -50 7 -79 -25 -80 -89 0 -108 -290 -297 -519 -338 -124 -23
-211 -30 -216 -19 -3 10 -72 152 -151 316 -113 230 -139 299 -118 311 51 28
21 112 -38 109 -40 -3 -60 11 -84 60 -17 34 -32 57 -33 50z m-953 -853 c10 -5
13 -101 7 -212 -7 -114 -4 -180 5 -152 9 28 17 120 18 207 l2 156 55 -11 c151
-31 749 -133 845 -144 136 -16 135 -15 249 -142 l93 -104 -166 -156 c-91 -86
-222 -209 -290 -274 l-125 -117 -278 142 c-266 136 -359 176 -272 115 21 -15
150 -83 286 -152 l248 -124 -136 -123 c-75 -68 -144 -122 -153 -121 -9 1 -34
3 -56 5 -22 2 -40 12 -40 22 0 16 -154 390 -269 651 -138 314 -210 509 -199
537 12 32 118 31 176 -3z m1273 -216 c123 -16 144 -52 72 -124 -28 -28 -54
-48 -57 -43 -3 6 -46 54 -96 107 -49 54 -74 92 -55 86 19 -7 80 -19 136 -26z
m201 -391 c27 -38 50 -141 80 -362 l43 -309 -123 -222 c-67 -121 -122 -229
-121 -238 1 -32 64 68 152 241 49 97 92 174 96 170 4 -4 22 -123 40 -266 18
-142 38 -267 45 -278 57 -91 -261 -12 -334 84 -5 7 -19 13 -30 14 -102 4 -169
79 -250 277 -88 218 -158 356 -159 318 -1 -13 47 -131 106 -264 l108 -240
-253 127 c-138 69 -294 145 -345 168 -172 78 -168 86 331 550 l442 411 67 -64
c36 -35 84 -88 105 -117z m-1204 -1047 c-20 -132 -46 -316 -58 -410 -12 -93
-30 -224 -40 -290 -11 -66 -20 -153 -20 -193 0 -98 -59 -116 -119 -35 -28 39
-34 59 -17 60 14 1 2 12 -26 25 -105 46 -624 627 -663 740 -63 187 -99 276
-108 267 -5 -5 14 -70 42 -144 70 -187 68 -188 -78 -35 -192 200 -184 212 169
234 125 9 572 61 685 80 52 9 55 5 57 -64 2 -41 10 -102 19 -135 12 -40 14
-16 7 74 l-11 133 57 7 c37 5 71 -6 98 -33 l43 -41 -37 -240z m537 95 c201
-102 365 -193 365 -203 0 -10 12 -16 26 -15 68 8 412 -177 413 -222 1 -25 -10
-45 -24 -45 -14 0 -74 -23 -133 -51 -86 -40 -113 -45 -127 -25 -14 20 -16 18
-9 -5 11 -35 -406 -233 -471 -224 -19 2 -35 -5 -35 -16 0 -12 -83 -61 -184
-109 l-184 -87 -75 220 c-41 122 -79 226 -86 232 -24 25 -8 -40 59 -232 86
-248 88 -226 -23 -280 -146 -71 -157 -47 -116 249 18 131 41 254 52 274 10 20
13 44 7 54 -10 15 62 621 75 631 26 19 87 47 95 43 6 -2 174 -88 375 -189z
m1205 -606 c-10 -18 -57 -67 -104 -110 -47 -42 -104 -101 -126 -131 -22 -30
-70 -94 -108 -141 -84 -109 167 144 300 300 l90 107 84 -25 c94 -28 92 -22 71
-245 l-13 -135 -119 -100 -118 -99 -144 9 -143 9 118 -18 c65 -11 120 -22 123
-25 3 -3 -88 -83 -202 -179 -114 -96 -213 -166 -220 -155 -16 27 45 292 81
346 16 24 21 55 13 69 -9 13 4 113 28 221 25 108 50 236 56 285 l12 88 -27
-80 c-14 -44 -43 -167 -64 -274 -28 -149 -45 -196 -73 -203 -50 -13 -65 -69
-29 -109 39 -43 -16 -324 -66 -341 -41 -13 -80 -56 -66 -71 7 -6 0 -13 -16
-13 -97 -5 -299 -38 -324 -53 -9 -5 -85 -14 -170 -19 -85 -5 -256 -26 -381
-47 -257 -44 -321 -27 -322 82 l-1 53 155 -36 c202 -46 371 -69 265 -36 -38
12 -146 37 -240 55 l-170 34 -6 167 c-5 148 -1 169 35 195 23 15 41 46 41 68
0 27 24 50 75 71 41 17 141 61 222 99 183 85 186 85 102 -7 -52 -56 -45 -53
26 15 108 102 948 509 984 477 29 -26 103 -20 129 11 36 43 267 -61 242 -109z
m439 -148 c-1 -25 -45 -75 -114 -129 l-111 -87 13 77 c7 43 13 115 13 161 l0
83 100 -32 c78 -25 100 -41 99 -73z"/>
                <path d="M2960 3872 c-366 -181 -464 -234 -454 -244 10 -11 651 302 683 333
38 38 -22 14 -229 -89z"/>
                <path d="M3334 3876 c-24 -97 -58 -375 -50 -399 5 -15 25 75 45 199 32 198 35
326 5 200z"/>
                <path d="M3624 3180 c-146 -19 -272 -41 -278 -48 -27 -26 515 43 543 70 10 10
15 17 10 16 -5 -1 -129 -18 -275 -38z"/>
                <path d="M3182 3153 c-33 -40 -5 -93 48 -93 25 0 51 15 58 33 14 36 -20 87
-58 87 -14 0 -35 -12 -48 -27z"/>
                <path d="M3019 2926 l-109 -113 105 85 c107 87 135 118 121 133 -5 4 -57 -43
-117 -105z"/>
                <path d="M2002 2644 c151 -73 242 -109 338 -133 l50 -12 -51 29 c-60 34 -453
193 -474 191 -8 -1 54 -34 137 -75z"/>
                <path d="M2470 2492 c-41 -29 -30 -86 20 -105 35 -13 90 26 90 65 0 45 -69 70
-110 40z"/>
                <path d="M2319 2287 c-156 -133 -316 -294 -269 -270 43 21 407 361 389 362 -6
1 -60 -41 -120 -92z"/>
                <path d="M2684 2410 c18 -19 702 -152 744 -145 23 3 -129 40 -338 81 -389 76
-424 82 -406 64z"/>
                <path d="M3584 2276 c-55 -55 11 -146 76 -106 32 20 23 104 -12 118 -40 15
-36 16 -64 -12z"/>
                <path d="M3361 1991 c-82 -83 -144 -154 -139 -160 6 -5 81 62 169 150 87 87
149 159 138 159 -11 0 -87 -67 -168 -149z"/>
                <path d="M3720 1936 c0 -40 127 -364 135 -342 7 21 -113 366 -127 366 -4 0 -8
-11 -8 -24z"/>
                <path d="M2801 1491 c-54 -65 35 -143 95 -83 26 25 28 41 12 67 -30 47 -76 54
-107 16z"/>
                <path d="M3175 1445 c113 -3 297 -3 410 0 113 4 21 7 -205 7 -225 0 -318 -3
-205 -7z"/>
                <path d="M2631 1402 c11 -9 90 -42 176 -73 150 -53 162 -63 285 -214 70 -88
128 -153 128 -145 0 20 -78 130 -137 195 -77 84 -47 83 199 -7 273 -100 256
-86 196 -153 l-48 -55 64 57 c58 53 69 56 128 35 84 -29 98 -15 17 18 l-62 26
98 102 c53 56 109 120 124 142 14 22 -34 -22 -108 -97 l-135 -137 -290 101
c-160 56 -304 118 -320 138 -16 19 -23 24 -16 10 16 -33 -7 -32 -112 7 -139
50 -207 69 -187 50z"/>
                <path d="M3560 4772 c0 -7 279 -194 526 -351 74 -48 140 -82 146 -76 10 11
-175 137 -487 332 -157 98 -185 113 -185 95z"/>
                <path d="M3413 4625 c-21 -138 -34 -461 -15 -387 21 78 51 462 37 462 -6 0
-15 -34 -22 -75z"/>
                <path d="M2383 4642 c-47 -29 -20 -112 37 -112 56 0 78 55 39 101 -27 33 -39
35 -76 11z"/>
                <path d="M1350 4429 c-41 -50 -70 -95 -66 -100 9 -8 109 108 143 166 32 53 -5
21 -77 -66z"/>
                <path d="M4670 4420 c21 -27 108 -120 193 -206 94 -93 151 -166 145 -183 -6
-15 8 -47 31 -70 39 -39 42 -58 31 -207 -6 -90 -3 -209 7 -264 18 -97 18 -95
23 80 l5 180 26 -160 27 -160 -9 130 c-5 71 -20 181 -33 244 -21 104 -20 118
14 156 47 52 21 107 -56 116 -32 4 -92 50 -159 120 -132 141 -298 292 -245
224z"/>
                <path d="M4602 4425 c-1 -14 20 -80 47 -145 26 -66 45 -120 42 -120 -3 0 -45
14 -92 30 -47 17 -90 26 -95 21 -10 -11 -3 -14 125 -57 74 -26 244 -361 326
-644 7 -22 29 -67 50 -100 33 -52 36 -54 22 -10 -20 60 -21 174 -2 310 15 105
14 102 -37 -110 -9 -40 -32 2 -120 219 -118 294 -118 295 -26 263 35 -12 74
-21 86 -20 12 0 -23 17 -78 36 -105 37 -113 47 -199 242 -26 61 -48 99 -49 85z"/>
                <path d="M4321 4281 c-16 -29 -13 -46 10 -70 32 -32 109 -12 109 28 0 81 -83
110 -119 42z"/>
                <path d="M4021 4100 c-49 -43 -84 -83 -78 -90 6 -6 56 29 109 79 120 110 93
120 -31 11z"/>
                <path d="M4443 4125 c36 -77 165 -317 176 -325 7 -5 48 -68 91 -140 83 -140
150 -234 150 -211 0 8 -38 78 -84 157 -46 79 -93 161 -105 184 -74 139 -270
428 -228 335z"/>
                <path d="M1533 3967 c-25 -25 -13 -103 17 -114 48 -19 90 8 90 57 0 54 -71 92
-107 57z"/>
                <path d="M942 3696 c-14 -73 -22 -145 -18 -159 12 -36 62 209 52 255 -4 21
-20 -22 -34 -96z"/>
                <path d="M859 3459 c-38 -38 -39 -46 -13 -86 26 -39 24 -71 -18 -284 -26 -131
-47 -257 -46 -279 2 -77 36 51 76 287 31 181 47 233 80 256 47 33 55 86 18
123 -33 33 -50 30 -97 -17z"/>
                <path d="M2045 3311 c-120 -100 -206 -159 -212 -145 -6 14 -11 9 -11 -9 -1
-18 -49 -74 -107 -125 -194 -169 -67 -93 156 93 342 285 397 334 386 345 -5 5
-101 -66 -212 -159z"/>
                <path d="M2382 3366 c-3 -60 58 -493 72 -506 16 -15 -13 272 -43 420 -14 72
-27 110 -29 86z"/>
                <path d="M4107 3270 c-19 -49 9 -90 60 -90 56 0 84 52 51 93 -30 36 -96 35
-111 -3z"/>
                <path d="M4453 3279 c-208 -24 -188 -46 27 -30 246 18 384 47 220 46 -60 0
-172 -7 -247 -16z"/>
                <path d="M922 3246 c-2 -27 53 -430 69 -501 9 -39 2 -45 -56 -46 -55 0 -60 -3
-29 -21 20 -12 49 -17 64 -11 19 8 31 -14 39 -73 33 -219 58 -353 66 -346 8 8
-17 194 -48 366 l-11 64 107 7 107 8 -105 3 c-120 5 -112 -11 -144 274 -20
166 -55 333 -59 276z"/>
                <path d="M5057 3100 c-7 -17 -28 -168 -49 -336 l-36 -306 -116 -62 c-144 -77
-140 -99 5 -26 l105 54 -13 -77 c-21 -127 -39 -358 -27 -347 6 6 21 91 34 190
33 262 34 262 100 290 34 14 66 34 73 44 6 11 -17 4 -53 -14 -35 -18 -68 -29
-73 -24 -7 7 31 312 59 474 3 17 29 -22 59 -86 102 -220 155 -142 94 136 -15
68 -17 61 -10 -50 9 -143 8 -142 -40 26 -18 65 -37 113 -42 108 -8 -8 24 -153
64 -288 6 -20 -13 14 -43 74 -29 61 -59 142 -66 180 -8 44 -18 59 -25 40z"/>
                <path d="M1480 2890 c-35 -42 -10 -90 47 -90 56 0 84 52 51 93 -30 35 -67 34
-98 -3z"/>
                <path d="M5211 2662 c-7 -11 -11 -50 -9 -86 3 -48 -25 -116 -99 -243 -57 -97
-97 -186 -90 -198 8 -12 4 -15 -10 -7 -25 15 -26 12 -32 -75 -4 -78 16 -46
149 232 76 161 122 234 148 238 56 10 87 69 60 112 -25 40 -98 57 -117 27z"/>
                <path d="M4573 2290 c-19 -49 8 -90 58 -90 47 0 83 61 59 100 -19 31 -104 24
-117 -10z"/>
                <path d="M4295 2246 c36 -5 90 -5 120 0 30 4 1 8 -65 8 -66 0 -91 -4 -55 -8z" />
                <path d="M1823 1894 c-37 -46 -6 -97 55 -90 41 5 52 17 52 56 0 58 -69 80
-107 34z"/>
                <path d="M2320 1253 c-38 -14 -97 -41 -130 -60 -86 -49 6 -25 140 37 108 51
103 64 -10 23z"/>
            </g>
        </svg>
    )
}

export function ConvertIcon() {
    return (
        <svg className='convert-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
            <g transform="translate(0,90) scale(0.1,-0.1)">
                <path d="M378 736 c-56 -16 -103 -44 -140 -83 -33 -35 -78 -123 -78 -154 0
-42 -15 -53 -64 -50 -33 2 -46 -1 -46 -11 0 -7 32 -45 70 -83 l70 -69 75 74
c40 40 71 78 68 83 -3 5 -26 7 -52 5 -49 -3 -49 -3 -37 55 11 50 83 130 134
146 36 12 114 11 172 -3 20 -5 30 0 48 24 l24 30 -47 21 c-59 26 -137 32 -197
15z"/>
                <path d="M647 522 c-37 -37 -67 -71 -67 -75 0 -4 23 -7 50 -7 45 0 50 -2 50
-22 0 -36 -45 -123 -76 -147 -63 -49 -151 -65 -223 -40 -28 10 -35 9 -57 -12
-31 -29 -30 -41 4 -56 123 -54 256 -28 355 71 32 32 66 103 75 159 7 42 8 42
55 45 26 2 47 7 47 12 0 12 -125 140 -136 140 -5 0 -40 -30 -77 -68z"/>
            </g>
        </svg>
    )
}

export function CrossArrow() {
    return (
        <svg className='cross-arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <g transform="translate(0,64) scale(0.05,-0.05)" stroke="none">
                <path d="M532 1112 c-111 -130 -111 -132 -21 -132 l71 0 -6 -135 -6 -135 -135
-6 -135 -6 0 71 c0 90 -1 90 -141 -27 l-117 -98 117 -102 c140 -121 141 -122
141 -31 l0 71 135 -6 135 -6 6 -135 6 -135 -71 0 c-91 0 -89 -8 30 -140 l99
-110 99 110 c119 132 121 140 31 140 l-70 0 0 140 0 140 140 0 140 0 0 -70 c0
-90 2 -89 142 32 l117 101 -114 99 c-137 117 -145 118 -145 27 l0 -71 -135 6
-135 6 -6 135 -6 135 71 0 c90 0 90 2 -21 132 -113 132 -103 132 -216 0z"/>
            </g>
        </svg>
    )
}

export function CoatHanger() {
    return (
        <svg className="coat-hanger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108">
            <g transform="translate(0,108) scale(0.1,-0.1)">
                <path d="M498 820 c-24 -15 -58 -73 -58 -101 0 -13 16 -41 35 -62 55 -60 50
-70 -80 -136 -22 -11 -58 -31 -80 -45 -22 -14 -64 -37 -93 -53 -111 -58 -140
-114 -87 -168 l26 -25 384 0 384 0 26 25 c30 31 34 84 8 107 -18 16 -155 99
-183 111 -21 10 -113 62 -160 92 -29 18 -40 32 -40 50 0 16 -14 38 -40 62 -45
43 -48 53 -22 76 27 24 61 21 71 -6 14 -36 38 -52 56 -37 23 19 18 46 -16 85
-26 30 -37 35 -73 35 -22 0 -49 -5 -58 -10z m97 -315 c22 -13 63 -36 90 -50
28 -15 64 -35 80 -45 17 -10 50 -29 74 -42 44 -23 74 -55 65 -70 -7 -11 -724
-10 -724 1 0 26 17 43 63 66 29 14 59 30 67 35 44 29 172 100 179 100 5 0 14
7 21 15 17 21 38 18 85 -10z"/>
            </g>
        </svg>
    )
}

export function OKSquare() {
    return (
        <svg className="ok-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>
    )
}

export function CheckMark() {
    return (
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
    )
}

export function Gear() {
    return (
        <svg className="gear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
        </svg>
    )
}

export function InfoIcon() {
    return (
        <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
    )
}

export function RankStar() {
    return (
        <svg className="rank-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32l0 192c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-192c0-17.7-14.3-32-32-32l-128 0zM32 320c-17.7 0-32 14.3-32 32L0 480c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L32 320zm416 96l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0c-17.7 0-32 14.3-32 32z" />
        </svg>
    )
}

export function VolumeHigh() {
    return (
        <svg className="volume-high" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
        </svg>
    )
}

export function Warning() {
    return (
        <svg className="warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
        </svg>
    )
}
