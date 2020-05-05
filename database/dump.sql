--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_fk7;
ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_fk6;
ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_fk5;
ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_fk4;
ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_fk3;
ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_fk2;
ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_fk1;
ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_fk0;
ALTER TABLE ONLY public.interactions DROP CONSTRAINT interactions_fk1;
ALTER TABLE ONLY public.interactions DROP CONSTRAINT interactions_fk0;
ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_fk0;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_pk;
ALTER TABLE ONLY public."ticketStatus" DROP CONSTRAINT "ticketStatus_pk";
ALTER TABLE ONLY public."ticketPriority" DROP CONSTRAINT "ticketPriority_pk";
ALTER TABLE ONLY public.interactions DROP CONSTRAINT interactions_pk;
ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pk;
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.tickets ALTER COLUMN "ticketId" DROP DEFAULT;
ALTER TABLE public."ticketStatus" ALTER COLUMN "statusId" DROP DEFAULT;
ALTER TABLE public."ticketPriority" ALTER COLUMN "priorityId" DROP DEFAULT;
ALTER TABLE public.interactions ALTER COLUMN notes DROP DEFAULT;
ALTER TABLE public.interactions ALTER COLUMN "interactionId" DROP DEFAULT;
ALTER TABLE public.customers ALTER COLUMN "customerId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."tickets_ticketId_seq";
DROP TABLE public.tickets;
DROP SEQUENCE public."ticketStatus_statusId_seq";
DROP TABLE public."ticketStatus";
DROP SEQUENCE public."ticketPriority_priorityId_seq";
DROP TABLE public."ticketPriority";
DROP SEQUENCE public.interactions_notes_seq;
DROP SEQUENCE public."interactions_interactionId_seq";
DROP TABLE public.interactions;
DROP SEQUENCE public."customers_customerId_seq";
DROP TABLE public.customers;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    "customerId" integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "companyName" text NOT NULL,
    "jobTitle" text NOT NULL,
    "phoneNumber" text NOT NULL,
    email text NOT NULL,
    "addressStreet" text NOT NULL,
    "addressCity" text NOT NULL,
    "addressState" text NOT NULL,
    "addressZip" text NOT NULL,
    "repId" integer NOT NULL
);


--
-- Name: customers_customerId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."customers_customerId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_customerId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."customers_customerId_seq" OWNED BY public.customers."customerId";


--
-- Name: interactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.interactions (
    "interactionId" integer NOT NULL,
    type text NOT NULL,
    notes text NOT NULL,
    "userId" integer NOT NULL,
    "customerId" integer NOT NULL,
    "timeCreated" timestamp without time zone
);


--
-- Name: interactions_interactionId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."interactions_interactionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: interactions_interactionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."interactions_interactionId_seq" OWNED BY public.interactions."interactionId";


--
-- Name: interactions_notes_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.interactions_notes_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: interactions_notes_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.interactions_notes_seq OWNED BY public.interactions.notes;


--
-- Name: ticketPriority; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ticketPriority" (
    "priorityId" integer NOT NULL,
    name text NOT NULL,
    level integer NOT NULL
);


--
-- Name: ticketPriority_priorityId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ticketPriority_priorityId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ticketPriority_priorityId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ticketPriority_priorityId_seq" OWNED BY public."ticketPriority"."priorityId";


--
-- Name: ticketStatus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ticketStatus" (
    "statusId" integer NOT NULL,
    name text NOT NULL
);


--
-- Name: ticketStatus_statusId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ticketStatus_statusId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ticketStatus_statusId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ticketStatus_statusId_seq" OWNED BY public."ticketStatus"."statusId";


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tickets (
    "ticketId" integer NOT NULL,
    status integer NOT NULL,
    priority integer NOT NULL,
    description text NOT NULL,
    details text NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "dueDate" timestamp without time zone,
    "ownerId" integer NOT NULL,
    "assignedToId" integer,
    "customerId" integer NOT NULL
);


--
-- Name: tickets_ticketId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."tickets_ticketId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tickets_ticketId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."tickets_ticketId_seq" OWNED BY public.tickets."ticketId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "companyName" text NOT NULL,
    "jobTitle" text NOT NULL,
    "phoneNumber" text NOT NULL,
    email text NOT NULL,
    "addressStreet" text NOT NULL,
    "addressCity" text NOT NULL,
    "addressState" text NOT NULL,
    "addressZip" text NOT NULL,
    password text NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: customers customerId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN "customerId" SET DEFAULT nextval('public."customers_customerId_seq"'::regclass);


--
-- Name: interactions interactionId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interactions ALTER COLUMN "interactionId" SET DEFAULT nextval('public."interactions_interactionId_seq"'::regclass);


--
-- Name: interactions notes; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interactions ALTER COLUMN notes SET DEFAULT nextval('public.interactions_notes_seq'::regclass);


--
-- Name: ticketPriority priorityId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ticketPriority" ALTER COLUMN "priorityId" SET DEFAULT nextval('public."ticketPriority_priorityId_seq"'::regclass);


--
-- Name: ticketStatus statusId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ticketStatus" ALTER COLUMN "statusId" SET DEFAULT nextval('public."ticketStatus_statusId_seq"'::regclass);


--
-- Name: tickets ticketId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets ALTER COLUMN "ticketId" SET DEFAULT nextval('public."tickets_ticketId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers ("customerId", "firstName", "lastName", "companyName", "jobTitle", "phoneNumber", email, "addressStreet", "addressCity", "addressState", "addressZip", "repId") FROM stdin;
1	Will	Billiamson	Bill Propane & More	CFO	6968008132	bill.bill@willbill.biz	9200 Irvine Center Dr.	Irvine	CA	92618	1
2	Rori	Berston	Fanoodle	Professor	5627342188	rberston0@cdbaby.com	7 Morning Park	Los Angeles	CA	90005	4
3	Adan	Darwin	Rhyzio	Assistant Media Planner	2514642477	adarwin1@people.com.cn	240 Sheridan Trail	Mobile	AL	36605	1
4	Jilleen	Curragh	Fivechat	Community Outreach Specialist	4041880064	jcurragh2@shareasale.com	90 Vidon Court	Norcross	GA	30092	5
5	Paul	Ryhorovich	Chatterpoint	Safety Technician IV	5201309109	pryhorovich3@networkadvertising.org	0820 Rutledge Park	Tucson	AZ	85732	5
6	Jonie	Yokelman	Yotz	Tax Accountant	8133475142	jyokelman4@people.com.cn	676 Shopko Parkway	Tampa	FL	33605	2
7	Bridget	Jameson	Brainlounge	Actuary	5706138968	bjameson5@people.com.cn	7 Superior Pass	Wilkes Barre	PA	18768	4
8	Mandel	Popov	Wikizz	Information Systems Manager	8169064346	mpopov6@instagram.com	2 Anzinger Way	Kansas City	MO	64149	1
9	Locke	Coulthart	Zava	Quality Engineer	2023870414	lcoulthart7@berkeley.edu	50 Manufacturers Alley	Washington	DC	20599	2
10	Colette	Shilston	Edgewire	Research Associate	9161360766	cshilston8@hao123.com	8 Buhler Crossing	Sacramento	CA	94245	5
11	Tobi	Djekic	Twitterbeat	Structural Analysis Engineer	3059762690	tdjekic9@sfgate.com	671 Knutson Crossing	Miami Beach	FL	33141	4
12	Hugh	Burde	Izio	VP Sales	3055738023	hburdea@spotify.com	60867 Toban Road	Miami Beach	FL	33141	2
13	Obed	Pedel	Gevee	Design Engineer	4322476880	opedelb@seattletimes.com	25 West Place	Odessa	TX	79769	1
14	Neville	Braundt	Kayveo	VP Accounting	8597426811	nbraundtc@telegraph.co.uk	4889 Towne Hill	Lexington	KY	40586	6
15	Rianon	Tyre	Layo	Assistant Professor	8061582991	rtyred@github.io	4 Monica Street	Amarillo	TX	79171	2
16	Niccolo	Voyce	Podcat	General Manager	8508416003	nvoycee@google.ca	8 Pennsylvania Crossing	Pensacola	FL	32595	5
17	Daryl	Adamec	Devpulse	Cost Accountant	2405674546	dadamecf@issuu.com	15 Fieldstone Road	Silver Spring	MD	20918	2
18	Adina	Favill	Babbleset	Paralegal	7165710213	afavillg@clickbank.net	10 Logan Street	Buffalo	NY	14220	2
19	Hinze	Parlott	Skipfire	Web Designer I	4105033985	hparlotth@moonfruit.com	5776 Mallory Lane	Ridgely	MD	21684	1
20	Magnum	Burrill	Blogspan	Quality Control Specialist	6092080819	mburrilli@rediff.com	8 Iowa Plaza	Trenton	NJ	08695	1
21	Petr	Lowseley	Jabberbean	Pharmacist	6147770055	plowseleyj@sbwire.com	6 Brickson Park Pass	Columbus	OH	43268	6
22	Don	Knee	Fivespan	Physical Therapy Assistant	4404240810	dkneek@netvibes.com	60 Sutherland Junction	Cleveland	OH	44125	2
23	Katy	Bernli	Devpulse	Administrative Officer	3208599219	kbernlil@imageshack.us	85 Morrow Hill	Saint Cloud	MN	56372	4
24	Uriel	Lamb-shine	Buzzbean	Research Nurse	2159078835	ulambshinem@geocities.com	41003 Holy Cross Pass	Philadelphia	PA	19184	3
25	Boyce	Dessant	Eazzy	Professor	2029236211	bdessantn@cnbc.com	513 Truax Park	Washington	DC	20088	2
26	Cherie	Cramp	Yambee	Senior Cost Accountant	7187324423	ccrampo@discovery.com	830 Mosinee Circle	Brooklyn	NY	11236	2
27	Marya	Struys	Photobean	Human Resources Manager	3307310240	mstruysp@a8.net	08410 Eastlawn Court	Youngstown	OH	44555	5
28	Tilly	Brennan	Yakidoo	Accountant I	5016004202	tbrennanq@geocities.jp	3409 Holy Cross Avenue	Little Rock	AR	72215	2
29	Ardys	Garatty	Edgetag	Help Desk Technician	9162329893	agarattyr@de.vu	8 Rowland Lane	Sacramento	CA	95828	2
30	Bendicty	Gerring	Voonder	Payment Adjustment Coordinator	6107394539	bgerrings@cdbaby.com	36 Norway Maple Alley	Bethlehem	PA	18018	5
31	Dore	Loughnan	Jaloo	Geological Engineer	8328556545	dloughnant@github.io	83 Maywood Hill	Houston	TX	77040	6
32	Cairistiona	Matterson	Brainverse	Operator	8598174597	cmattersonu@123-reg.co.uk	04 Myrtle Parkway	Lexington	KY	40581	1
33	Ralph	La Padula	Lajo	Editor	2106355842	rlapadulav@soundcloud.com	85464 Calypso Avenue	San Antonio	TX	78215	1
34	Alika	Proppers	Meevee	Accountant IV	4194688960	aproppersw@webmd.com	43946 Thackeray Place	Mansfield	OH	44905	1
35	Anatollo	Pervew	Twimm	Dental Hygienist	5013222914	apervewx@deviantart.com	78 Darwin Junction	Little Rock	AR	72209	5
36	Nathalia	Imore	Rhybox	Mechanical Systems Engineer	2568980798	nimorey@symantec.com	363 Blackbird Plaza	Huntsville	AL	35895	1
37	Urbano	Tinsey	Gevee	Programmer Analyst III	5627542860	utinseyz@addtoany.com	8335 Summer Ridge Place	Long Beach	CA	90831	6
38	Eilis	Barrott	Edgeify	Librarian	8179204679	ebarrott10@shutterfly.com	49828 Fieldstone Avenue	Fort Worth	TX	76134	3
39	Marcellus	Torry	Bluejam	Assistant Professor	9377934698	mtorry11@1und1.de	55 Maple Wood Pass	Dayton	OH	45414	1
40	Hannie	Elner	Topdrive	Community Outreach Specialist	9711125409	helner12@ycombinator.com	400 Hoard Lane	Portland	OR	97271	4
41	Cornelia	Taverner	Leexo	Paralegal	5612923336	ctaverner13@oracle.com	3851 Killdeer Way	Lake Worth	FL	33467	3
42	Jordana	Donnersberg	Vinder	Office Assistant I	9403129163	jdonnersberg14@list-manage.com	37 Oxford Place	Denton	TX	76205	2
43	Austina	Payn	Quimm	Web Designer III	2121813791	apayn15@fema.gov	92838 Tony Circle	New York City	NY	10120	1
44	Theodore	Woltering	Cogidoo	Pharmacist	3034803415	twoltering16@ed.gov	2 Manley Trail	Aurora	CO	80045	6
45	Babette	Sturrock	Skibox	Dental Hygienist	8041075394	bsturrock17@vinaora.com	99 Elmside Pass	Richmond	VA	23277	5
46	Gare	Klejin	Kamba	Analog Circuit Design manager	2025626966	gklejin18@cnn.com	3051 Rowland Terrace	Washington	DC	20073	5
47	Sherri	Domoney	Trilith	Registered Nurse	7137046279	sdomoney19@storify.com	518 Harbort Junction	Houston	TX	77281	2
48	Benn	Oldman	Cogibox	Structural Engineer	8602273135	boldman1a@earthlink.net	09 Calypso Pass	Hartford	CT	06120	6
49	Rock	D'Acth	Jaxworks	Sales Associate	6141905854	rdacth1b@so-net.ne.jp	2 Forest Dale Junction	Columbus	OH	43268	3
50	Minor	Alway	Wordware	Account Coordinator	7759772034	malway1c@ftc.gov	07 Fairfield Place	Carson City	NV	89714	3
51	Daffie	Coltart	Innotype	Engineer III	4043667961	dcoltart1d@gnu.org	124 Briar Crest Parkway	Atlanta	GA	30301	3
52	Kellen	Maryon	Devbug	Structural Engineer	9156964745	kmaryon1e@cbc.ca	856 3rd Park	El Paso	TX	88514	3
53	Bonni	Baldick	Yadel	VP Sales	8642204856	bbaldick1f@utexas.edu	475 Sachtjen Hill	Greenville	SC	29615	2
54	Clerc	Snepp	Npath	Clinical Specialist	9162156579	csnepp1g@bigcartel.com	44968 Eagan Point	Sacramento	CA	95838	1
55	Bronnie	Woodings	Skibox	Health Coach I	4408930711	bwoodings1h@hp.com	635 Barnett Circle	Cleveland	OH	44177	3
56	Karoly	Beausang	Photojam	Data Coordiator	3184068482	kbeausang1i@prlog.org	99 Stone Corner Court	Shreveport	LA	71105	6
57	Meta	Cowlard	Plajo	Analog Circuit Design manager	3155341877	mcowlard1j@mac.com	01092 Cambridge Trail	Syracuse	NY	13205	4
58	Clint	Silbersak	Brightbean	Analog Circuit Design manager	6024669506	csilbersak1k@cornell.edu	63594 Park Meadow Hill	Phoenix	AZ	85072	2
59	Madge	Berni	Ntags	VP Sales	3369997116	mberni1l@xrea.com	83177 Muir Parkway	Winston Salem	NC	27157	4
60	Leandra	Candie	Agivu	Health Coach III	7278480987	lcandie1m@slashdot.org	65 Nelson Road	Clearwater	FL	34629	2
61	Barbra	Lampkin	Voonder	Account Coordinator	9518558508	blampkin1n@ucsd.edu	13 Paget Plaza	Riverside	CA	92513	3
62	Eran	Stansby	Midel	Web Developer II	6158059561	estansby1o@gnu.org	9062 Cordelia Road	Nashville	TN	37215	6
63	Harland	Manach	Aivee	Junior Executive	7705658873	hmanach1p@xrea.com	64456 Toban Terrace	Atlanta	GA	30323	4
64	Page	Pleuman	Npath	Assistant Manager	5033815481	ppleuman1q@bbb.org	56 Mcbride Drive	Portland	OR	97229	5
65	Hamnet	Barthram	Browsebug	Systems Administrator IV	8655139987	hbarthram1r@mapy.cz	0038 Maple Wood Alley	Knoxville	TN	37914	6
66	Town	Card	Minyx	Developer III	4051687617	tcard1s@webmd.com	08 Monterey Parkway	Oklahoma City	OK	73104	2
67	Gaven	Gummory	Thoughtworks	Environmental Specialist	2054029804	ggummory1t@vimeo.com	0202 Fallview Circle	Birmingham	AL	35236	6
68	Roxine	Mableson	Divavu	Environmental Specialist	5028580297	rmableson1u@forbes.com	607 Macpherson Street	Louisville	KY	40293	2
69	Derk	Chaffin	Rooxo	Recruiter	7071319529	dchaffin1v@ucoz.ru	69 Ridgeview Place	Santa Rosa	CA	95405	4
70	Tomkin	McNevin	Leexo	Senior Editor	6618478443	tmcnevin1w@discovery.com	3 Aberg Road	Bakersfield	CA	93399	3
71	Rene	Cammell	Livepath	Engineer III	4083653893	rcammell1x@360.cn	090 American Court	San Jose	CA	95173	1
72	Hale	Podmore	Zoombox	Pharmacist	2816949955	hpodmore1y@bizjournals.com	05 Larry Lane	Houston	TX	77005	2
73	Archibald	Issitt	Feedfish	Civil Engineer	8596663546	aissitt1z@utexas.edu	62604 Parkside Center	Lexington	KY	40586	6
74	Karalynn	Dwine	Yodel	Automation Specialist I	6265812263	kdwine20@theglobeandmail.com	085 High Crossing Plaza	Los Angeles	CA	90071	5
75	Errick	Rawood	Jayo	Assistant Manager	7861062872	erawood21@jugem.jp	64 Brickson Park Point	Miami	FL	33134	3
76	Shell	Beswick	Agivu	Structural Analysis Engineer	6058662776	sbeswick22@netscape.com	92 Texas Crossing	Sioux Falls	SD	57193	4
77	Costa	Champerlen	Snaptags	Director of Sales	2255078656	cchamperlen23@reverbnation.com	86 Elmside Way	Baton Rouge	LA	70894	2
78	Penny	Tessington	Zoombox	Systems Administrator III	7189270608	ptessington24@gov.uk	512 Farwell Lane	Bronx	NY	10454	3
79	Rickie	Stanbro	Brightbean	Nurse	2024739034	rstanbro25@google.co.uk	89868 Jana Circle	Washington	DC	20010	6
80	Rowe	Hunnam	Skippad	Operator	7705130037	rhunnam26@opera.com	8 Oak Court	Duluth	GA	30096	4
81	Juliet	Passy	Flashpoint	Registered Nurse	5058539277	jpassy27@usda.gov	00 Hollow Ridge Court	Santa Fe	NM	87505	5
82	Joelly	Bes	Youspan	Administrative Assistant I	6463560788	jbes28@ow.ly	034 Stuart Center	New York City	NY	10110	1
83	Cliff	Ridsdale	Yabox	Geologist I	2025300939	cridsdale29@squarespace.com	2 Lillian Street	Washington	DC	20599	5
84	Alysa	Bush	Gabcube	Teacher	8605812585	abush2a@flickr.com	34 Mayfield Terrace	Hartford	CT	06183	6
85	Erna	MacLice	Omba	Biostatistician IV	2392491793	emaclice2b@ocn.ne.jp	20 Graceland Alley	Lehigh Acres	FL	33972	4
86	Chere	Uwins	Latz	Account Executive	9048446214	cuwins2c@gnu.org	711 Summerview Terrace	Jacksonville	FL	32215	4
87	Lisa	Orr	Brainbox	Staff Accountant IV	2546583111	lorr2d@quantcast.com	14 Del Sol Crossing	Gatesville	TX	76598	5
88	Trey	Seath	Browsetype	Administrative Assistant IV	3035787238	tseath2e@tripod.com	05 Birchwood Point	Denver	CO	80228	3
89	Orran	Bicheno	Eabox	Recruiter	2089564610	obicheno2f@chronoengine.com	634 Hooker Point	Pocatello	ID	83206	5
90	Kelbee	Krysztofowicz	Meeveo	Occupational Therapist	8062815862	kkrysztofowicz2g@sciencedaily.com	161 Almo Parkway	Amarillo	TX	79171	2
91	Germain	Wardlow	Trunyx	Registered Nurse	2057578753	gwardlow2h@go.com	99839 Loftsgordon Court	Birmingham	AL	35285	3
92	Bibi	Bartocci	Kwimbee	Accountant III	7208483490	bbartocci2i@ycombinator.com	09644 Susan Parkway	Denver	CO	80255	3
93	Alica	Broxton	Izio	VP Marketing	4067480107	abroxton2j@java.com	62704 David Hill	Missoula	MT	59806	2
94	Rois	Bollands	Devify	Director of Sales	9016140543	rbollands2k@fda.gov	9322 Veith Circle	Memphis	TN	38168	1
95	Merrily	Hurdle	Oba	Executive Secretary	3039970626	mhurdle2l@auda.org.au	0368 Farragut Court	Aurora	CO	80045	1
96	Hedvige	Gaines	Jayo	Physical Therapy Assistant	9156831859	hgaines2m@tinyurl.com	7 Wayridge Crossing	El Paso	TX	88584	5
97	Eustacia	Gindghill	Trilith	Web Designer II	2123699600	egindghill2n@friendfeed.com	828 Bluestem Crossing	New York City	NY	10184	4
98	Oneida	Pressland	Jabberstorm	Assistant Media Planner	8042995365	opressland2o@hibu.com	87981 Prentice Point	Richmond	VA	23293	2
99	Marlee	Chantrell	Aivee	Payment Adjustment Coordinator	4101843749	mchantrell2p@ustream.tv	45 Ridge Oak Hill	Baltimore	MD	21203	2
100	Ronnie	Pisculli	Wordtune	Sales Representative	5122679147	rpisculli2q@imdb.com	7692 Vernon Trail	Austin	TX	78737	4
101	Blaire	Pedrozzi	Fliptune	Legal Assistant	6121181843	bpedrozzi2r@tmall.com	7294 Sachs Plaza	Minneapolis	MN	55428	3
102	Lil	B	Based Sales	Music Producer	3141592653	basedg@basedsales.com	2800 E Observatory Rd	Los Angeles	CA	90027	1
103	Angelique	Stroulger	Skalith	Web Designer II	5097347250	astroulger0@netscape.com	7 Kennedy Circle	Spokane	WA	99210	2
104	Krissy	Board	Livepath	Paralegal	9198869189	kboard1@tripadvisor.com	930 Algoma Crossing	Durham	NC	27710	2
105	Angelique	Escoffrey	Kwilith	Business Systems Development Analyst	2104405340	aescoffrey2@51.la	7296 Delaware Alley	San Antonio	TX	78260	2
106	Astrix	Trinke	Babbleset	Sales Associate	2132707307	atrinke3@liveinternet.ru	782 Monument Junction	North Hollywood	CA	91616	2
107	Susette	Anderson	Dabshots	GIS Technical Architect	3031413276	sanderson4@list-manage.com	510 Mayer Plaza	Boulder	CO	80310	1
108	Ianthe	Ferreras	LiveZ	Biostatistician IV	7042533227	iferreras5@apache.org	60 Hagan Point	Gastonia	NC	28055	5
109	Aubine	Schubbert	Dynazzy	Assistant Media Planner	9032446583	aschubbert6@ibm.com	15 Stuart Center	Longview	TX	75605	2
110	Findlay	Roskrug	Buzzshare	Project Manager	3106834366	froskrug7@miibeian.gov.cn	0948 Continental Terrace	Santa Monica	CA	90410	4
111	Tyrus	Wearden	Skyble	General Manager	4323352220	twearden8@usatoday.com	5 Mallard Terrace	Midland	TX	79710	5
112	Brunhilde	Queree	Rhycero	Developer I	7132730565	bqueree9@phoca.cz	6795 Ilene Parkway	Houston	TX	77234	6
113	Lea	Cockshutt	Skiba	Senior Cost Accountant	6125634873	lcockshutta@blinklist.com	506 Pankratz Terrace	Minneapolis	MN	55470	6
114	Kirstin	Gaythor	Shufflester	Accounting Assistant III	9178069224	kgaythorb@flavors.me	4 Kensington Place	Brooklyn	NY	11215	2
115	Rosalinda	Wenman	Brainbox	Senior Sales Associate	5858354530	rwenmanc@addthis.com	9296 Parkside Way	Rochester	NY	14683	2
116	Catlin	Sands-Allan	Wikizz	Help Desk Technician	7064590614	csandsalland@google.cn	1791 Rowland Trail	Columbus	GA	31998	4
117	Taylor	Luck	Katz	Desktop Support Technician	7132703047	tlucke@msn.com	97 Pierstorff Way	Houston	TX	77223	3
118	Valentijn	Dufore	Feedbug	Help Desk Operator	5013815269	vduforef@de.vu	6199 Dunning Lane	North Little Rock	AR	72118	6
119	Julee	Lantuffe	Janyx	Geological Engineer	6029406879	jlantuffeg@com.com	0337 Roth Avenue	Gilbert	AZ	85297	1
120	Luce	Ginni	Avamba	Editor	7574352694	lginnih@google.com.au	42557 Westridge Parkway	Herndon	VA	22070	4
121	Carmela	Jeste	Youtags	Engineer IV	8066325374	cjestei@friendfeed.com	52 Mccormick Crossing	Lubbock	TX	79415	1
122	Merrili	Collidge	Oyoyo	Biostatistician III	6514997454	mcollidgej@admin.ch	78 Monument Pass	Saint Paul	MN	55172	5
123	Arabela	Gurnett	Digitube	VP Accounting	5016618019	agurnettk@who.int	056 Butternut Way	North Little Rock	AR	72118	6
124	Henryetta	Hindenberger	Innojam	Administrative Officer	9549812227	hhindenbergerl@com.com	31071 Mandrake Plaza	Hollywood	FL	33023	4
125	Shamus	Schapiro	Shuffledrive	Internal Auditor	6028983736	sschapirom@sitemeter.com	3 Ramsey Alley	Phoenix	AZ	85062	6
126	Deonne	Bricket	Gabcube	Computer Systems Analyst III	6089414825	dbricketn@jiathis.com	4 Morningstar Place	Madison	WI	53785	2
127	Edita	Kennion	Kazio	Junior Executive	6153071276	ekenniono@123-reg.co.uk	4653 Golden Leaf Road	Nashville	TN	37245	1
128	Erskine	Buckby	Blogtags	Paralegal	7065109893	ebuckbyp@soundcloud.com	74690 Oriole Plaza	Columbus	GA	31914	3
129	Danit	Tewkesberry	Realfire	VP Quality Control	3607699321	dtewkesberryq@t-online.de	13002 Pawling Pass	Olympia	WA	98516	3
130	Aridatha	Blackway	Zoonoodle	Chemical Engineer	8642297298	ablackwayr@salon.com	52169 Hanson Trail	Greenville	SC	29610	5
131	Winni	Rasp	InnoZ	Accountant I	5592867723	wrasps@apple.com	14900 Schurz Pass	Fresno	CA	93740	2
132	Ashla	Gymlett	Gigazoom	Professor	4058107364	agymlettt@boston.com	4 Loomis Alley	Oklahoma City	OK	73109	6
133	Josselyn	O'Rafferty	Kare	Accountant III	3015483695	joraffertyu@deliciousdays.com	5 Arizona Hill	Bethesda	MD	20892	5
134	Sibyl	Lamzed	Youspan	VP Product Management	6627540013	slamzedv@berkeley.edu	55606 Starling Parkway	Columbus	MS	39705	1
135	Dannie	McGoogan	Devpulse	VP Marketing	9174755520	dmcgooganw@google.com	60244 Southridge Center	Jamaica	NY	11436	4
136	Dacy	Plumridege	Feedmix	Marketing Manager	4055944900	dplumridegex@rambler.ru	25 Bartelt Road	Edmond	OK	73034	4
137	Arliene	Garbott	Thoughtsphere	Accountant III	8047029532	agarbotty@trellian.com	477 Schiller Avenue	Richmond	VA	23272	6
138	Kerwin	McKue	Aivee	Teacher	8063935050	kmckuez@state.gov	3815 Carberry Circle	Lubbock	TX	79452	4
139	Jarrod	Polly	Jaxnation	Cost Accountant	9406177096	jpolly10@xrea.com	6 Bluestem Trail	Denton	TX	76210	5
140	Lorraine	Guinn	Oodoo	Geologist IV	2142812159	lguinn11@reddit.com	73093 New Castle Terrace	Dallas	TX	75205	2
141	Haydon	Gallgher	Topicstorm	Programmer Analyst IV	2409919689	hgallgher12@imageshack.us	21 Blaine Avenue	Hagerstown	MD	21747	3
142	Brianne	Dawbery	Dynabox	VP Marketing	2022381103	bdawbery13@salon.com	97 Mayer Road	Washington	DC	20540	5
143	Cristian	McLorinan	Dabfeed	Automation Specialist IV	8061939464	cmclorinan14@walmart.com	479 Fuller Parkway	Amarillo	TX	79116	2
144	Monro	Lorenzo	Tagpad	Systems Administrator III	8433285506	mlorenzo15@sun.com	43416 Comanche Hill	Charleston	SC	29416	2
145	Sheeree	Jordi	Photobug	Legal Assistant	6053349020	sjordi16@mapy.cz	1 Dennis Road	Sioux Falls	SD	57105	3
146	Gasper	Peatman	Browseblab	Actuary	2035482715	gpeatman17@twitpic.com	53 Schiller Place	Stamford	CT	06912	5
147	Gilburt	Burchett	Midel	Librarian	7851241501	gburchett18@google.com	880 Waywood Pass	Topeka	KS	66611	5
148	Vick	Gordon	Browsecat	Senior Quality Engineer	9012166081	vgordon19@intel.com	2656 Judy Plaza	Memphis	TN	38181	5
149	Fionna	Josipovitz	Dazzlesphere	Desktop Support Technician	9041168618	fjosipovitz1a@jigsy.com	11624 Waywood Drive	Jacksonville	FL	32244	6
150	Jerrome	Rickell	Roombo	Product Engineer	7192490918	jrickell1b@wikipedia.org	167 Butterfield Terrace	Pueblo	CO	81010	4
151	Sallyanne	Korting	Katz	Professor	8013730397	skorting1c@qq.com	329 South Parkway	Salt Lake City	UT	84115	6
152	Ede	Webermann	Blogpad	VP Sales	6165221709	ewebermann1d@soup.io	916 1st Way	Grand Rapids	MI	49505	1
153	Pepi	Gildea	Tazz	Cost Accountant	2096842198	pgildea1e@storify.com	918 Mcbride Avenue	Fresno	CA	93726	4
154	Livia	Benjafield	Mycat	Assistant Media Planner	5035618520	lbenjafield1f@jalbum.net	3 Welch Point	Portland	OR	97229	3
155	Dorena	Gratten	Babbleblab	Associate Professor	8623294175	dgratten1g@so-net.ne.jp	071 Stephen Drive	Paterson	NJ	07505	4
156	Alma	Chitter	Vipe	VP Sales	2608106590	achitter1h@xinhuanet.com	4 Sunnyside Circle	Fort Wayne	IN	46857	4
157	Towney	Tuffey	Jaxspan	Junior Executive	2051506524	ttuffey1i@time.com	020 Troy Alley	Birmingham	AL	35210	5
158	Amalia	Crimes	Brightdog	Staff Scientist	2053714417	acrimes1j@nifty.com	0050 Helena Terrace	Birmingham	AL	35263	2
159	Mord	Rubie	Bubblebox	Junior Executive	5053327564	mrubie1k@cnn.com	13 Shelley Court	Las Cruces	NM	88006	2
160	Belvia	Cotterel	Photolist	Data Coordiator	7023634554	bcotterel1l@cdbaby.com	07682 Buhler Crossing	Las Vegas	NV	89105	4
161	Buckie	Jiri	JumpXS	VP Quality Control	3215786726	bjiri1m@wikipedia.org	81704 Carey Parkway	Orlando	FL	32835	4
162	Erica	Dunstall	Chatterpoint	Electrical Engineer	7131101273	edunstall1n@hexun.com	012 Holmberg Drive	Houston	TX	77228	3
163	Horton	Parkey	Snaptags	Cost Accountant	8137801639	hparkey1o@macromedia.com	16 Dexter Street	Tampa	FL	33673	3
164	Dallis	Hemstead	Gabspot	Human Resources Assistant I	9789681849	dhemstead1p@skype.com	0747 John Wall Hill	Boston	MA	02163	2
165	Joli	Josifovic	Livepath	Community Outreach Specialist	6467408734	jjosifovic1q@merriam-webster.com	44 Farragut Alley	New York City	NY	10060	6
166	Brena	Ivy	Topiczoom	Senior Quality Engineer	6088711433	bivy1r@apple.com	30108 Dahle Hill	Madison	WI	53785	6
167	Rochester	Risdale	Gigashots	Technical Writer	2539348404	rrisdale1s@guardian.co.uk	63158 Debs Terrace	Tacoma	WA	98464	5
168	Sella	Vidgeon	Zoomlounge	Director of Sales	8037912851	svidgeon1t@twitter.com	4 Village Green Plaza	Columbia	SC	29203	4
169	Junie	Kenewell	Skimia	Occupational Therapist	7187317699	jkenewell1u@about.me	634 Bellgrove Parkway	Brooklyn	NY	11236	3
170	Hy	Konrad	Centizu	Marketing Manager	8137630830	hkonrad1v@nyu.edu	32 Lien Junction	Tampa	FL	33686	2
171	Catharine	Carpenter	Meeveo	Human Resources Manager	7203641094	ccarpenter1w@microsoft.com	0 American Ash Pass	Denver	CO	80255	6
172	Karoly	Erskine Sandys	Skivee	Registered Nurse	5098308956	kerskinesandys1x@si.edu	270 Golden Leaf Alley	Spokane	WA	99215	3
173	Humfrey	Mulroy	Skinix	Programmer Analyst III	6309735692	hmulroy1y@yahoo.com	87 Miller Avenue	Naperville	IL	60567	4
174	Martguerita	Lamplough	Blogtag	Statistician II	5135383254	mlamplough1z@time.com	0052 Kipling Way	Cincinnati	OH	45208	1
175	Jojo	Rubinovitch	Cogilith	Executive Secretary	6028497726	jrubinovitch20@prlog.org	521 Anhalt Junction	Phoenix	AZ	85077	4
176	Stevie	Spir	Midel	Operator	9716413862	sspir21@paginegialle.it	9889 Fisk Junction	Portland	OR	97271	2
177	Lodovico	Witherden	Leenti	Nurse Practicioner	6147924399	lwitherden22@artisteer.com	762 Armistice Plaza	Columbus	OH	43210	1
178	Ario	McKeurton	Divavu	Assistant Media Planner	9372857173	amckeurton23@arizona.edu	08343 Farwell Alley	Dayton	OH	45403	5
179	Derward	Phinnessy	Oyoloo	Developer IV	9042470522	dphinnessy24@toplist.cz	791 Gale Way	Jacksonville	FL	32230	4
180	Dede	Dumper	Mydo	VP Product Management	9731362857	ddumper25@amazonaws.com	7107 Dahle Drive	Newark	NJ	07104	6
181	Alaster	Bolt	Jetwire	Internal Auditor	9169475027	abolt26@examiner.com	8 Eastwood Plaza	Sacramento	CA	94230	6
182	Matelda	Dash	Roodel	Environmental Tech	9149063666	mdash27@boston.com	5989 Alpine Street	Mount Vernon	NY	10557	6
183	Addy	Tranter	Wikivu	Marketing Assistant	2518854861	atranter28@blogs.com	63 Cambridge Hill	Mobile	AL	36628	2
184	Ivory	Chesser	Latz	Statistician I	8137707341	ichesser29@globo.com	89717 Park Meadow Way	Tampa	FL	33615	4
185	Wilmar	Ible	Camido	Tax Accountant	2403971235	wible2a@admin.ch	75497 Spaight Hill	Silver Spring	MD	20910	2
186	Danny	Creer	Aimbu	VP Accounting	2021427478	dcreer2b@icio.us	1280 Pine View Place	Washington	DC	20215	5
187	Katharyn	Yewdall	Wikido	Compensation Analyst	8121804448	kyewdall2c@networkadvertising.org	4045 Darwin Alley	Evansville	IN	47747	1
188	Meyer	Suttle	Rhybox	Social Worker	6155469855	msuttle2d@timesonline.co.uk	366 Larry Hill	Nashville	TN	37235	1
189	Blythe	Dalrymple	Brainverse	Programmer Analyst II	2394625047	bdalrymple2e@mapy.cz	7 Summer Ridge Drive	Fort Myers	FL	33994	5
190	Rube	Maryska	Edgepulse	Assistant Media Planner	3523459321	rmaryska2f@dropbox.com	9 Ridge Oak Road	Ocala	FL	34479	1
191	Haywood	Craven	Zoomzone	Software Engineer IV	8084921696	hcraven2g@google.ca	253 Acker Lane	Honolulu	HI	96815	5
192	Petr	Tame	Meedoo	Assistant Professor	5093079423	ptame2h@nhs.uk	486 Leroy Terrace	Spokane	WA	99205	6
193	Marijn	Goble	Youopia	Database Administrator I	2134742132	mgoble2i@fema.gov	36985 Manufacturers Terrace	Los Angeles	CA	90050	3
194	Hugo	Khadir	Yozio	Pharmacist	2024124662	hkhadir2j@devhub.com	8 Elka Street	Washington	DC	20370	6
195	Melisent	Skin	Yacero	Nurse Practicioner	4343819760	mskin2k@state.tx.us	96776 Bluestem Avenue	Lynchburg	VA	24515	2
196	Marilyn	Horick	Eamia	Automation Specialist II	8053670899	mhorick2l@issuu.com	92 Northfield Road	Bakersfield	CA	93311	4
197	Rabi	Eouzan	Chatterpoint	Speech Pathologist	2133094286	reouzan2m@umich.edu	02065 Novick Avenue	Los Angeles	CA	90087	6
198	Fraser	Cordall	LiveZ	Research Associate	2024035817	fcordall2n@xing.com	651 Schiller Avenue	Washington	DC	20073	6
199	Piggy	Worral	Skaboo	Chemical Engineer	9018375080	pworral2o@naver.com	99 Summerview Junction	Memphis	TN	38114	1
200	Lonny	Lenahan	Wikivu	Accounting Assistant II	7141654090	llenahan2p@lulu.com	67931 Golf Course Point	Irvine	CA	92710	1
201	Nikolaos	Downs	Eazzy	Developer IV	6026901350	ndowns2q@army.mil	61 Knutson Avenue	Phoenix	AZ	85040	4
202	Minerva	Kahane	Yoveo	Web Designer IV	2144646274	mkahane2r@smugmug.com	1922 Lake View Terrace	Dallas	TX	75387	5
203	Jerrie	de Leon	Abatz	Senior Editor	3038822884	jdeleon2s@businesswire.com	5470 Farragut Parkway	Denver	CO	80255	1
\.


--
-- Data for Name: interactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.interactions ("interactionId", type, notes, "userId", "customerId", "timeCreated") FROM stdin;
1	by phone	talked to Will about his name	1	1	2020-05-05 16:00:22.84152
2	email	followed up with Carmela about our meeting	1	121	2020-05-05 16:00:22.84152
3	in person	Cherie asked for more info about our current promotions	1	26	2020-05-05 16:00:22.84152
\.


--
-- Data for Name: ticketPriority; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ticketPriority" ("priorityId", name, level) FROM stdin;
1	High	1
2	Medium	2
3	Low	3
\.


--
-- Data for Name: ticketStatus; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ticketStatus" ("statusId", name) FROM stdin;
1	Created
2	In-Progress
3	Pending
4	Complete
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tickets ("ticketId", status, priority, description, details, "startDate", "dueDate", "ownerId", "assignedToId", "customerId") FROM stdin;
1	1	3	 Low on stock on propane	Call Jan about propane vendors	2020-05-04 16:58:40.520663	\N	1	1	1
2	1	3	Need quotes on propane accessories	Call Hank for more prices	2020-05-04 17:02:23.816835	\N	1	1	1
3	1	3	 Call Bill	Ask him why his name is so weird	2020-05-04 17:03:53.62954	\N	1	1	1
4	2	1	 Call Mom	She keeps texting me how run my biz wth	2020-05-04 17:05:24.140499	\N	1	1	1
5	1	1	 Kill Bill Vol. 1	Ask him if he wants to go watch a movie.	2020-05-04 17:06:07.963722	\N	1	1	1
6	1	1	Visit Bills shop	Check what supplies Bill needs	2020-05-04 17:06:53.867358	\N	1	1	1
7	1	1	Propane tank expiration dates	Check inventory for expired tanks. See if Will can take any expired	2020-05-04 17:08:46.46379	\N	1	1	1
8	1	2	BBQ Specials	Send email to Will regarding July’s Weber grill specials	2020-05-04 17:09:36.481726	\N	1	1	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "firstName", "lastName", "companyName", "jobTitle", "phoneNumber", email, "addressStreet", "addressCity", "addressState", "addressZip", password) FROM stdin;
1	Our	Guy	LearningFuze	Sales	9496797699	ourguy@lfz.com	9200 Irvine Center Dr. #200	Irvine	CA	92618	password
2	Local	Host	LearningFuze	Server	9496797699	localhost@lfz.com	9200 Irvine Center Dr. #200	Irvine	CA	92618	password
3	Ub	Untu	LearningFuze	Operator	9496797699	ubuntu@lfz.com	9200 Irvine Center Dr. #200	Irvine	CA	92618	password
4	Magilla	Gorilla	LearningFuze	Gorilla	9496797699	localhost@lfz.com	9200 Irvine Center Dr. #200	Irvine	CA	92618	password
5	Tad	Ghostal	LearningFuze	Host	9496797699	spghost@lfz.com	9200 Irvine Center Dr. #200	Irvine	CA	92618	password
6	Outta	Ideas	LearningFuze	Sales	9496797699	email@lfz.com	9200 Irvine Center Dr. #200	Irvine	CA	92618	password
\.


--
-- Name: customers_customerId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."customers_customerId_seq"', 203, true);


--
-- Name: interactions_interactionId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."interactions_interactionId_seq"', 3, true);


--
-- Name: interactions_notes_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.interactions_notes_seq', 1, false);


--
-- Name: ticketPriority_priorityId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ticketPriority_priorityId_seq"', 3, true);


--
-- Name: ticketStatus_statusId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ticketStatus_statusId_seq"', 4, true);


--
-- Name: tickets_ticketId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."tickets_ticketId_seq"', 8, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 6, true);


--
-- Name: customers customers_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pk PRIMARY KEY ("customerId");


--
-- Name: interactions interactions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interactions
    ADD CONSTRAINT interactions_pk PRIMARY KEY ("interactionId");


--
-- Name: ticketPriority ticketPriority_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ticketPriority"
    ADD CONSTRAINT "ticketPriority_pk" PRIMARY KEY ("priorityId");


--
-- Name: ticketStatus ticketStatus_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ticketStatus"
    ADD CONSTRAINT "ticketStatus_pk" PRIMARY KEY ("statusId");


--
-- Name: tickets tickets_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pk PRIMARY KEY ("ticketId");


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY ("userId");


--
-- Name: customers customers_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_fk0 FOREIGN KEY ("repId") REFERENCES public.users("userId");


--
-- Name: interactions interactions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interactions
    ADD CONSTRAINT interactions_fk0 FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: interactions interactions_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interactions
    ADD CONSTRAINT interactions_fk1 FOREIGN KEY ("customerId") REFERENCES public.customers("customerId");


--
-- Name: tickets tickets_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_fk0 FOREIGN KEY (status) REFERENCES public."ticketStatus"("statusId");


--
-- Name: tickets tickets_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_fk1 FOREIGN KEY (priority) REFERENCES public."ticketPriority"("priorityId");


--
-- Name: tickets tickets_fk2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_fk2 FOREIGN KEY ("ownerId") REFERENCES public.users("userId");


--
-- Name: tickets tickets_fk3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_fk3 FOREIGN KEY ("assignedToId") REFERENCES public.users("userId");


--
-- Name: tickets tickets_fk4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_fk4 FOREIGN KEY ("customerId") REFERENCES public.customers("customerId");


--
-- Name: tickets tickets_fk5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_fk5 FOREIGN KEY ("ownerId") REFERENCES public.users("userId");


--
-- Name: tickets tickets_fk6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_fk6 FOREIGN KEY ("assignedToId") REFERENCES public.users("userId");


--
-- Name: tickets tickets_fk7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_fk7 FOREIGN KEY ("customerId") REFERENCES public.customers("customerId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

