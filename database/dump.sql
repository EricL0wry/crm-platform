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
ALTER TABLE public.interactions ALTER COLUMN "timeCreated" DROP DEFAULT;
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
DROP SEQUENCE public."interactions_timeCreated_seq";
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
    notes integer NOT NULL,
    "timeCreated" integer NOT NULL,
    "userId" integer NOT NULL,
    "customerId" integer NOT NULL
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
-- Name: interactions_timeCreated_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."interactions_timeCreated_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: interactions_timeCreated_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."interactions_timeCreated_seq" OWNED BY public.interactions."timeCreated";


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
-- Name: interactions timeCreated; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interactions ALTER COLUMN "timeCreated" SET DEFAULT nextval('public."interactions_timeCreated_seq"'::regclass);


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
\.


--
-- Data for Name: interactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.interactions ("interactionId", type, notes, "timeCreated", "userId", "customerId") FROM stdin;
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
\.


--
-- Name: customers_customerId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."customers_customerId_seq"', 1, true);


--
-- Name: interactions_interactionId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."interactions_interactionId_seq"', 1, false);


--
-- Name: interactions_notes_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.interactions_notes_seq', 1, false);


--
-- Name: interactions_timeCreated_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."interactions_timeCreated_seq"', 1, false);


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

SELECT pg_catalog.setval('public."users_userId_seq"', 1, true);


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

