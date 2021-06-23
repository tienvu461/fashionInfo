--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE fashion_info_db;




--
-- Drop roles
--

DROP ROLE fashion_info;


--
-- Roles
--

CREATE ROLE fashion_info;
ALTER ROLE fashion_info WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md5d544e2c7bb696fa5ec3e8f24db41e11d';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: fashion_info
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO fashion_info;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: fashion_info
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: fashion_info
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: fashion_info
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "fashion_info_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

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

--
-- Name: fashion_info_db; Type: DATABASE; Schema: -; Owner: fashion_info
--

CREATE DATABASE fashion_info_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE fashion_info_db OWNER TO fashion_info;

\connect fashion_info_db

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account_emailaddress; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.account_emailaddress (
    id integer NOT NULL,
    email character varying(254) NOT NULL,
    verified boolean NOT NULL,
    "primary" boolean NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.account_emailaddress OWNER TO fashion_info;

--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.account_emailaddress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_emailaddress_id_seq OWNER TO fashion_info;

--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.account_emailaddress_id_seq OWNED BY public.account_emailaddress.id;


--
-- Name: account_emailconfirmation; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.account_emailconfirmation (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    sent timestamp with time zone,
    key character varying(64) NOT NULL,
    email_address_id integer NOT NULL
);


ALTER TABLE public.account_emailconfirmation OWNER TO fashion_info;

--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.account_emailconfirmation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_emailconfirmation_id_seq OWNER TO fashion_info;

--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.account_emailconfirmation_id_seq OWNED BY public.account_emailconfirmation.id;


--
-- Name: accounts_userprofile; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.accounts_userprofile (
    id integer NOT NULL,
    gender integer NOT NULL,
    dob date,
    social_url character varying(255),
    profile_photo character varying(100) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.accounts_userprofile OWNER TO fashion_info;

--
-- Name: accounts_userprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.accounts_userprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_userprofile_id_seq OWNER TO fashion_info;

--
-- Name: accounts_userprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.accounts_userprofile_id_seq OWNED BY public.accounts_userprofile.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO fashion_info;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO fashion_info;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO fashion_info;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO fashion_info;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO fashion_info;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO fashion_info;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO fashion_info;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO fashion_info;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO fashion_info;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO fashion_info;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO fashion_info;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO fashion_info;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO fashion_info;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO fashion_info;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO fashion_info;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO fashion_info;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO fashion_info;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO fashion_info;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO fashion_info;

--
-- Name: django_site; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.django_site OWNER TO fashion_info;

--
-- Name: django_site_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.django_site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_site_id_seq OWNER TO fashion_info;

--
-- Name: django_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.django_site_id_seq OWNED BY public.django_site.id;


--
-- Name: djconfig_config; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.djconfig_config (
    id integer NOT NULL,
    key character varying(75) NOT NULL,
    value text
);


ALTER TABLE public.djconfig_config OWNER TO fashion_info;

--
-- Name: djconfig_config_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.djconfig_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.djconfig_config_id_seq OWNER TO fashion_info;

--
-- Name: djconfig_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.djconfig_config_id_seq OWNED BY public.djconfig_config.id;


--
-- Name: photos_genericconfig; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_genericconfig (
    id integer NOT NULL,
    config_name character varying(50) NOT NULL,
    short_description character varying(200) NOT NULL,
    likes_interact_weight integer NOT NULL,
    comments_interact_weight integer NOT NULL,
    views_interact_weight integer NOT NULL,
    show_activities boolean NOT NULL,
    in_use boolean NOT NULL,
    site_name character varying(50) NOT NULL
);


ALTER TABLE public.photos_genericconfig OWNER TO fashion_info;

--
-- Name: photos_genericconfig_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_genericconfig_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_genericconfig_id_seq OWNER TO fashion_info;

--
-- Name: photos_genericconfig_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_genericconfig_id_seq OWNED BY public.photos_genericconfig.id;


--
-- Name: photos_magazine; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_magazine (
    id integer NOT NULL,
    title character varying(70) NOT NULL,
    slug character varying(255),
    thumbnail character varying(100) NOT NULL,
    banner character varying(100) NOT NULL,
    content text NOT NULL,
    status integer NOT NULL,
    view_count integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    author_id integer NOT NULL,
    category_id integer NOT NULL,
    sub_category_id integer NOT NULL
);


ALTER TABLE public.photos_magazine OWNER TO fashion_info;

--
-- Name: photos_magazine_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_magazine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_magazine_id_seq OWNER TO fashion_info;

--
-- Name: photos_magazine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_magazine_id_seq OWNED BY public.photos_magazine.id;


--
-- Name: photos_magazine_user_likes; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_magazine_user_likes (
    id integer NOT NULL,
    magazine_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.photos_magazine_user_likes OWNER TO fashion_info;

--
-- Name: photos_magazine_user_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_magazine_user_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_magazine_user_likes_id_seq OWNER TO fashion_info;

--
-- Name: photos_magazine_user_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_magazine_user_likes_id_seq OWNED BY public.photos_magazine_user_likes.id;


--
-- Name: photos_magazinearchivedfile; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_magazinearchivedfile (
    id integer NOT NULL,
    zip_file character varying(500) NOT NULL,
    magazine_id integer NOT NULL
);


ALTER TABLE public.photos_magazinearchivedfile OWNER TO fashion_info;

--
-- Name: photos_magazinearchivedfile_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_magazinearchivedfile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_magazinearchivedfile_id_seq OWNER TO fashion_info;

--
-- Name: photos_magazinearchivedfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_magazinearchivedfile_id_seq OWNED BY public.photos_magazinearchivedfile.id;


--
-- Name: photos_magazineattachedphoto; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_magazineattachedphoto (
    id integer NOT NULL,
    image character varying(500) NOT NULL,
    magazine_id integer NOT NULL
);


ALTER TABLE public.photos_magazineattachedphoto OWNER TO fashion_info;

--
-- Name: photos_magazineattachedphoto_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_magazineattachedphoto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_magazineattachedphoto_id_seq OWNER TO fashion_info;

--
-- Name: photos_magazineattachedphoto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_magazineattachedphoto_id_seq OWNED BY public.photos_magazineattachedphoto.id;


--
-- Name: photos_magazinecategory; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_magazinecategory (
    cat_id integer NOT NULL,
    cat_name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    "order" integer NOT NULL
);


ALTER TABLE public.photos_magazinecategory OWNER TO fashion_info;

--
-- Name: photos_magazinecategory_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_magazinecategory_cat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_magazinecategory_cat_id_seq OWNER TO fashion_info;

--
-- Name: photos_magazinecategory_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_magazinecategory_cat_id_seq OWNED BY public.photos_magazinecategory.cat_id;


--
-- Name: photos_magazinecomment; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_magazinecomment (
    cmt_id integer NOT NULL,
    content character varying(255) NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    magazine_id_id integer NOT NULL,
    parent_id integer,
    user_id_id integer NOT NULL
);


ALTER TABLE public.photos_magazinecomment OWNER TO fashion_info;

--
-- Name: photos_magazinecomment_cmt_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_magazinecomment_cmt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_magazinecomment_cmt_id_seq OWNER TO fashion_info;

--
-- Name: photos_magazinecomment_cmt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_magazinecomment_cmt_id_seq OWNED BY public.photos_magazinecomment.cmt_id;


--
-- Name: photos_magazinefeature; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_magazinefeature (
    id integer NOT NULL,
    in_use boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    feature_magazine_id integer NOT NULL
);


ALTER TABLE public.photos_magazinefeature OWNER TO fashion_info;

--
-- Name: photos_magazinefeature_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_magazinefeature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_magazinefeature_id_seq OWNER TO fashion_info;

--
-- Name: photos_magazinefeature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_magazinefeature_id_seq OWNED BY public.photos_magazinefeature.id;


--
-- Name: photos_magazinelike; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_magazinelike (
    like_id integer NOT NULL,
    is_enabled boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    magazine_id_id integer NOT NULL,
    user_id_id integer NOT NULL
);


ALTER TABLE public.photos_magazinelike OWNER TO fashion_info;

--
-- Name: photos_magazinelike_like_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_magazinelike_like_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_magazinelike_like_id_seq OWNER TO fashion_info;

--
-- Name: photos_magazinelike_like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_magazinelike_like_id_seq OWNED BY public.photos_magazinelike.like_id;


--
-- Name: photos_magazinesubcategory; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_magazinesubcategory (
    cat_id integer NOT NULL,
    cat_name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    "order" integer NOT NULL
);


ALTER TABLE public.photos_magazinesubcategory OWNER TO fashion_info;

--
-- Name: photos_magazinesubcategory_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_magazinesubcategory_cat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_magazinesubcategory_cat_id_seq OWNER TO fashion_info;

--
-- Name: photos_magazinesubcategory_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_magazinesubcategory_cat_id_seq OWNED BY public.photos_magazinesubcategory.cat_id;


--
-- Name: photos_photo; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_photo (
    id integer NOT NULL,
    title character varying(50) NOT NULL,
    slug character varying(255),
    model_name character varying(255),
    model_job character varying(255),
    shoot_date timestamp with time zone,
    location character varying(255),
    brand character varying(255),
    style character varying(255),
    photographer character varying(255),
    social_url character varying(255),
    post_date timestamp with time zone NOT NULL,
    image_path character varying(100) NOT NULL,
    status integer NOT NULL,
    view_count integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.photos_photo OWNER TO fashion_info;

--
-- Name: photos_photo_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_photo_id_seq OWNER TO fashion_info;

--
-- Name: photos_photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_photo_id_seq OWNED BY public.photos_photo.id;


--
-- Name: photos_photo_user_likes; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_photo_user_likes (
    id integer NOT NULL,
    photo_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.photos_photo_user_likes OWNER TO fashion_info;

--
-- Name: photos_photo_user_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_photo_user_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_photo_user_likes_id_seq OWNER TO fashion_info;

--
-- Name: photos_photo_user_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_photo_user_likes_id_seq OWNED BY public.photos_photo_user_likes.id;


--
-- Name: photos_photocategory; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_photocategory (
    cat_id integer NOT NULL,
    cat_name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.photos_photocategory OWNER TO fashion_info;

--
-- Name: photos_photocategory_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_photocategory_cat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_photocategory_cat_id_seq OWNER TO fashion_info;

--
-- Name: photos_photocategory_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_photocategory_cat_id_seq OWNED BY public.photos_photocategory.cat_id;


--
-- Name: photos_photocomment; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_photocomment (
    cmt_id integer NOT NULL,
    content character varying(255) NOT NULL,
    active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    parent_id integer,
    photo_id_id integer NOT NULL,
    user_id_id integer NOT NULL
);


ALTER TABLE public.photos_photocomment OWNER TO fashion_info;

--
-- Name: photos_photocomment_cmt_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_photocomment_cmt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_photocomment_cmt_id_seq OWNER TO fashion_info;

--
-- Name: photos_photocomment_cmt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_photocomment_cmt_id_seq OWNED BY public.photos_photocomment.cmt_id;


--
-- Name: photos_photofeature; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_photofeature (
    id integer NOT NULL,
    in_use boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    feature_photo_id integer NOT NULL,
    login_photo_id integer NOT NULL,
    popup_photo_id integer NOT NULL,
    signup_photo_id integer NOT NULL,
    subscribe_photo_id integer NOT NULL
);


ALTER TABLE public.photos_photofeature OWNER TO fashion_info;

--
-- Name: photos_photofeature_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_photofeature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_photofeature_id_seq OWNER TO fashion_info;

--
-- Name: photos_photofeature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_photofeature_id_seq OWNED BY public.photos_photofeature.id;


--
-- Name: photos_photolike; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.photos_photolike (
    like_id integer NOT NULL,
    is_enabled boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    photo_id_id integer NOT NULL,
    user_id_id integer NOT NULL
);


ALTER TABLE public.photos_photolike OWNER TO fashion_info;

--
-- Name: photos_photolike_like_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.photos_photolike_like_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_photolike_like_id_seq OWNER TO fashion_info;

--
-- Name: photos_photolike_like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.photos_photolike_like_id_seq OWNED BY public.photos_photolike.like_id;


--
-- Name: social_auth_association; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.social_auth_association (
    id integer NOT NULL,
    server_url character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    secret character varying(255) NOT NULL,
    issued integer NOT NULL,
    lifetime integer NOT NULL,
    assoc_type character varying(64) NOT NULL
);


ALTER TABLE public.social_auth_association OWNER TO fashion_info;

--
-- Name: social_auth_association_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.social_auth_association_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.social_auth_association_id_seq OWNER TO fashion_info;

--
-- Name: social_auth_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.social_auth_association_id_seq OWNED BY public.social_auth_association.id;


--
-- Name: social_auth_code; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.social_auth_code (
    id integer NOT NULL,
    email character varying(254) NOT NULL,
    code character varying(32) NOT NULL,
    verified boolean NOT NULL,
    "timestamp" timestamp with time zone NOT NULL
);


ALTER TABLE public.social_auth_code OWNER TO fashion_info;

--
-- Name: social_auth_code_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.social_auth_code_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.social_auth_code_id_seq OWNER TO fashion_info;

--
-- Name: social_auth_code_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.social_auth_code_id_seq OWNED BY public.social_auth_code.id;


--
-- Name: social_auth_nonce; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.social_auth_nonce (
    id integer NOT NULL,
    server_url character varying(255) NOT NULL,
    "timestamp" integer NOT NULL,
    salt character varying(65) NOT NULL
);


ALTER TABLE public.social_auth_nonce OWNER TO fashion_info;

--
-- Name: social_auth_nonce_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.social_auth_nonce_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.social_auth_nonce_id_seq OWNER TO fashion_info;

--
-- Name: social_auth_nonce_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.social_auth_nonce_id_seq OWNED BY public.social_auth_nonce.id;


--
-- Name: social_auth_partial; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.social_auth_partial (
    id integer NOT NULL,
    token character varying(32) NOT NULL,
    next_step smallint NOT NULL,
    backend character varying(32) NOT NULL,
    data text NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    CONSTRAINT social_auth_partial_next_step_check CHECK ((next_step >= 0))
);


ALTER TABLE public.social_auth_partial OWNER TO fashion_info;

--
-- Name: social_auth_partial_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.social_auth_partial_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.social_auth_partial_id_seq OWNER TO fashion_info;

--
-- Name: social_auth_partial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.social_auth_partial_id_seq OWNED BY public.social_auth_partial.id;


--
-- Name: social_auth_usersocialauth; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.social_auth_usersocialauth (
    id integer NOT NULL,
    provider character varying(32) NOT NULL,
    uid character varying(255) NOT NULL,
    extra_data text NOT NULL,
    user_id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL
);


ALTER TABLE public.social_auth_usersocialauth OWNER TO fashion_info;

--
-- Name: social_auth_usersocialauth_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.social_auth_usersocialauth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.social_auth_usersocialauth_id_seq OWNER TO fashion_info;

--
-- Name: social_auth_usersocialauth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.social_auth_usersocialauth_id_seq OWNED BY public.social_auth_usersocialauth.id;


--
-- Name: spirit_cache; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_cache (
    cache_key character varying(255) NOT NULL,
    value text NOT NULL,
    expires timestamp with time zone NOT NULL
);


ALTER TABLE public.spirit_cache OWNER TO fashion_info;

--
-- Name: spirit_category_category; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_category_category (
    id integer NOT NULL,
    title character varying(75) NOT NULL,
    slug character varying(50) NOT NULL,
    description character varying(255) NOT NULL,
    is_closed boolean NOT NULL,
    is_removed boolean NOT NULL,
    is_private boolean NOT NULL,
    parent_id integer,
    is_global boolean NOT NULL,
    color character varying(7) NOT NULL,
    reindex_at timestamp with time zone NOT NULL,
    sort integer NOT NULL,
    CONSTRAINT spirit_category_category_sort_check CHECK ((sort >= 0))
);


ALTER TABLE public.spirit_category_category OWNER TO fashion_info;

--
-- Name: spirit_category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_category_category_id_seq OWNER TO fashion_info;

--
-- Name: spirit_category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_category_category_id_seq OWNED BY public.spirit_category_category.id;


--
-- Name: spirit_comment_bookmark_commentbookmark; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_comment_bookmark_commentbookmark (
    id integer NOT NULL,
    comment_number integer NOT NULL,
    topic_id integer NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT spirit_comment_bookmark_commentbookmark_comment_number_check CHECK ((comment_number >= 0))
);


ALTER TABLE public.spirit_comment_bookmark_commentbookmark OWNER TO fashion_info;

--
-- Name: spirit_comment_bookmark_commentbookmark_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_comment_bookmark_commentbookmark_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_comment_bookmark_commentbookmark_id_seq OWNER TO fashion_info;

--
-- Name: spirit_comment_bookmark_commentbookmark_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_comment_bookmark_commentbookmark_id_seq OWNED BY public.spirit_comment_bookmark_commentbookmark.id;


--
-- Name: spirit_comment_comment; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_comment_comment (
    id integer NOT NULL,
    comment text NOT NULL,
    comment_html text NOT NULL,
    action integer NOT NULL,
    date timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    is_modified boolean NOT NULL,
    ip_address inet,
    modified_count integer NOT NULL,
    likes_count integer NOT NULL,
    topic_id integer NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT spirit_comment_comment_likes_count_check CHECK ((likes_count >= 0)),
    CONSTRAINT spirit_comment_comment_modified_count_check CHECK ((modified_count >= 0))
);


ALTER TABLE public.spirit_comment_comment OWNER TO fashion_info;

--
-- Name: spirit_comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_comment_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_comment_comment_id_seq OWNER TO fashion_info;

--
-- Name: spirit_comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_comment_comment_id_seq OWNED BY public.spirit_comment_comment.id;


--
-- Name: spirit_comment_flag_commentflag; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_comment_flag_commentflag (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    is_closed boolean NOT NULL,
    comment_id integer NOT NULL,
    moderator_id integer
);


ALTER TABLE public.spirit_comment_flag_commentflag OWNER TO fashion_info;

--
-- Name: spirit_comment_flag_commentflag_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_comment_flag_commentflag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_comment_flag_commentflag_id_seq OWNER TO fashion_info;

--
-- Name: spirit_comment_flag_commentflag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_comment_flag_commentflag_id_seq OWNED BY public.spirit_comment_flag_commentflag.id;


--
-- Name: spirit_comment_flag_flag; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_comment_flag_flag (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    reason integer NOT NULL,
    body text NOT NULL,
    comment_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.spirit_comment_flag_flag OWNER TO fashion_info;

--
-- Name: spirit_comment_flag_flag_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_comment_flag_flag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_comment_flag_flag_id_seq OWNER TO fashion_info;

--
-- Name: spirit_comment_flag_flag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_comment_flag_flag_id_seq OWNED BY public.spirit_comment_flag_flag.id;


--
-- Name: spirit_comment_history_commenthistory; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_comment_history_commenthistory (
    id integer NOT NULL,
    comment_html text NOT NULL,
    date timestamp with time zone NOT NULL,
    comment_fk_id integer NOT NULL
);


ALTER TABLE public.spirit_comment_history_commenthistory OWNER TO fashion_info;

--
-- Name: spirit_comment_history_commenthistory_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_comment_history_commenthistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_comment_history_commenthistory_id_seq OWNER TO fashion_info;

--
-- Name: spirit_comment_history_commenthistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_comment_history_commenthistory_id_seq OWNED BY public.spirit_comment_history_commenthistory.id;


--
-- Name: spirit_comment_like_commentlike; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_comment_like_commentlike (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    comment_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.spirit_comment_like_commentlike OWNER TO fashion_info;

--
-- Name: spirit_comment_like_commentlike_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_comment_like_commentlike_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_comment_like_commentlike_id_seq OWNER TO fashion_info;

--
-- Name: spirit_comment_like_commentlike_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_comment_like_commentlike_id_seq OWNED BY public.spirit_comment_like_commentlike.id;


--
-- Name: spirit_comment_poll_commentpoll; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_comment_poll_commentpoll (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    choice_min integer NOT NULL,
    choice_max integer NOT NULL,
    mode integer NOT NULL,
    close_at timestamp with time zone,
    is_removed boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    comment_id integer NOT NULL,
    CONSTRAINT spirit_comment_poll_commentpoll_choice_max_check CHECK ((choice_max >= 0)),
    CONSTRAINT spirit_comment_poll_commentpoll_choice_min_check CHECK ((choice_min >= 0))
);


ALTER TABLE public.spirit_comment_poll_commentpoll OWNER TO fashion_info;

--
-- Name: spirit_comment_poll_commentpoll_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_comment_poll_commentpoll_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_comment_poll_commentpoll_id_seq OWNER TO fashion_info;

--
-- Name: spirit_comment_poll_commentpoll_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_comment_poll_commentpoll_id_seq OWNED BY public.spirit_comment_poll_commentpoll.id;


--
-- Name: spirit_comment_poll_commentpollchoice; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_comment_poll_commentpollchoice (
    id integer NOT NULL,
    number integer NOT NULL,
    description character varying(255) NOT NULL,
    vote_count integer NOT NULL,
    is_removed boolean NOT NULL,
    poll_id integer NOT NULL,
    CONSTRAINT spirit_comment_poll_commentpollchoice_number_check CHECK ((number >= 0)),
    CONSTRAINT spirit_comment_poll_commentpollchoice_vote_count_check CHECK ((vote_count >= 0))
);


ALTER TABLE public.spirit_comment_poll_commentpollchoice OWNER TO fashion_info;

--
-- Name: spirit_comment_poll_commentpollchoice_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_comment_poll_commentpollchoice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_comment_poll_commentpollchoice_id_seq OWNER TO fashion_info;

--
-- Name: spirit_comment_poll_commentpollchoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_comment_poll_commentpollchoice_id_seq OWNED BY public.spirit_comment_poll_commentpollchoice.id;


--
-- Name: spirit_comment_poll_commentpollvote; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_comment_poll_commentpollvote (
    id integer NOT NULL,
    is_removed boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    choice_id integer NOT NULL,
    voter_id integer NOT NULL
);


ALTER TABLE public.spirit_comment_poll_commentpollvote OWNER TO fashion_info;

--
-- Name: spirit_comment_poll_commentpollvote_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_comment_poll_commentpollvote_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_comment_poll_commentpollvote_id_seq OWNER TO fashion_info;

--
-- Name: spirit_comment_poll_commentpollvote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_comment_poll_commentpollvote_id_seq OWNED BY public.spirit_comment_poll_commentpollvote.id;


--
-- Name: spirit_rl_cache; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_rl_cache (
    cache_key character varying(255) NOT NULL,
    value text NOT NULL,
    expires timestamp with time zone NOT NULL
);


ALTER TABLE public.spirit_rl_cache OWNER TO fashion_info;

--
-- Name: spirit_topic_favorite_topicfavorite; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_topic_favorite_topicfavorite (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    topic_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.spirit_topic_favorite_topicfavorite OWNER TO fashion_info;

--
-- Name: spirit_topic_favorite_topicfavorite_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_topic_favorite_topicfavorite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_topic_favorite_topicfavorite_id_seq OWNER TO fashion_info;

--
-- Name: spirit_topic_favorite_topicfavorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_topic_favorite_topicfavorite_id_seq OWNED BY public.spirit_topic_favorite_topicfavorite.id;


--
-- Name: spirit_topic_notification_topicnotification; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_topic_notification_topicnotification (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    action integer NOT NULL,
    is_read boolean NOT NULL,
    is_active boolean NOT NULL,
    comment_id integer NOT NULL,
    topic_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.spirit_topic_notification_topicnotification OWNER TO fashion_info;

--
-- Name: spirit_topic_notification_topicnotification_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_topic_notification_topicnotification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_topic_notification_topicnotification_id_seq OWNER TO fashion_info;

--
-- Name: spirit_topic_notification_topicnotification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_topic_notification_topicnotification_id_seq OWNED BY public.spirit_topic_notification_topicnotification.id;


--
-- Name: spirit_topic_private_topicprivate; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_topic_private_topicprivate (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    topic_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.spirit_topic_private_topicprivate OWNER TO fashion_info;

--
-- Name: spirit_topic_private_topicprivate_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_topic_private_topicprivate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_topic_private_topicprivate_id_seq OWNER TO fashion_info;

--
-- Name: spirit_topic_private_topicprivate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_topic_private_topicprivate_id_seq OWNED BY public.spirit_topic_private_topicprivate.id;


--
-- Name: spirit_topic_topic; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_topic_topic (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(50) NOT NULL,
    date timestamp with time zone NOT NULL,
    last_active timestamp with time zone NOT NULL,
    is_pinned boolean NOT NULL,
    is_globally_pinned boolean NOT NULL,
    is_closed boolean NOT NULL,
    is_removed boolean NOT NULL,
    view_count integer NOT NULL,
    comment_count integer NOT NULL,
    category_id integer NOT NULL,
    user_id integer NOT NULL,
    reindex_at timestamp with time zone NOT NULL,
    CONSTRAINT spirit_topic_topic_comment_count_check CHECK ((comment_count >= 0)),
    CONSTRAINT spirit_topic_topic_view_count_check CHECK ((view_count >= 0))
);


ALTER TABLE public.spirit_topic_topic OWNER TO fashion_info;

--
-- Name: spirit_topic_topic_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_topic_topic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_topic_topic_id_seq OWNER TO fashion_info;

--
-- Name: spirit_topic_topic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_topic_topic_id_seq OWNED BY public.spirit_topic_topic.id;


--
-- Name: spirit_topic_unread_topicunread; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_topic_unread_topicunread (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    is_read boolean NOT NULL,
    topic_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.spirit_topic_unread_topicunread OWNER TO fashion_info;

--
-- Name: spirit_topic_unread_topicunread_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_topic_unread_topicunread_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_topic_unread_topicunread_id_seq OWNER TO fashion_info;

--
-- Name: spirit_topic_unread_topicunread_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_topic_unread_topicunread_id_seq OWNED BY public.spirit_topic_unread_topicunread.id;


--
-- Name: spirit_user_userprofile; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.spirit_user_userprofile (
    id integer NOT NULL,
    slug character varying(50) NOT NULL,
    location character varying(75) NOT NULL,
    last_seen timestamp with time zone NOT NULL,
    last_ip inet,
    timezone character varying(32) NOT NULL,
    is_administrator boolean NOT NULL,
    is_moderator boolean NOT NULL,
    is_verified boolean NOT NULL,
    topic_count integer NOT NULL,
    comment_count integer NOT NULL,
    user_id integer NOT NULL,
    last_post_hash character varying(32) NOT NULL,
    last_post_on timestamp with time zone,
    nickname character varying(255) NOT NULL,
    avatar character varying(255) NOT NULL,
    notify integer NOT NULL,
    CONSTRAINT spirit_user_userprofile_comment_count_check CHECK ((comment_count >= 0)),
    CONSTRAINT spirit_user_userprofile_notify_check CHECK ((notify >= 0)),
    CONSTRAINT spirit_user_userprofile_topic_count_check CHECK ((topic_count >= 0))
);


ALTER TABLE public.spirit_user_userprofile OWNER TO fashion_info;

--
-- Name: spirit_user_userprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.spirit_user_userprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spirit_user_userprofile_id_seq OWNER TO fashion_info;

--
-- Name: spirit_user_userprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.spirit_user_userprofile_id_seq OWNED BY public.spirit_user_userprofile.id;


--
-- Name: taggit_tag; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.taggit_tag (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL
);


ALTER TABLE public.taggit_tag OWNER TO fashion_info;

--
-- Name: taggit_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.taggit_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.taggit_tag_id_seq OWNER TO fashion_info;

--
-- Name: taggit_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.taggit_tag_id_seq OWNED BY public.taggit_tag.id;


--
-- Name: taggit_taggeditem; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.taggit_taggeditem (
    id integer NOT NULL,
    object_id integer NOT NULL,
    content_type_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.taggit_taggeditem OWNER TO fashion_info;

--
-- Name: taggit_taggeditem_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.taggit_taggeditem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.taggit_taggeditem_id_seq OWNER TO fashion_info;

--
-- Name: taggit_taggeditem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.taggit_taggeditem_id_seq OWNED BY public.taggit_taggeditem.id;


--
-- Name: token_blacklist_blacklistedtoken; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.token_blacklist_blacklistedtoken (
    id integer NOT NULL,
    blacklisted_at timestamp with time zone NOT NULL,
    token_id integer NOT NULL
);


ALTER TABLE public.token_blacklist_blacklistedtoken OWNER TO fashion_info;

--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.token_blacklist_blacklistedtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_blacklist_blacklistedtoken_id_seq OWNER TO fashion_info;

--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.token_blacklist_blacklistedtoken_id_seq OWNED BY public.token_blacklist_blacklistedtoken.id;


--
-- Name: token_blacklist_outstandingtoken; Type: TABLE; Schema: public; Owner: fashion_info
--

CREATE TABLE public.token_blacklist_outstandingtoken (
    id integer NOT NULL,
    token text NOT NULL,
    created_at timestamp with time zone,
    expires_at timestamp with time zone NOT NULL,
    user_id integer,
    jti character varying(255) NOT NULL
);


ALTER TABLE public.token_blacklist_outstandingtoken OWNER TO fashion_info;

--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: fashion_info
--

CREATE SEQUENCE public.token_blacklist_outstandingtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_blacklist_outstandingtoken_id_seq OWNER TO fashion_info;

--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fashion_info
--

ALTER SEQUENCE public.token_blacklist_outstandingtoken_id_seq OWNED BY public.token_blacklist_outstandingtoken.id;


--
-- Name: account_emailaddress id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.account_emailaddress ALTER COLUMN id SET DEFAULT nextval('public.account_emailaddress_id_seq'::regclass);


--
-- Name: account_emailconfirmation id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.account_emailconfirmation ALTER COLUMN id SET DEFAULT nextval('public.account_emailconfirmation_id_seq'::regclass);


--
-- Name: accounts_userprofile id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.accounts_userprofile ALTER COLUMN id SET DEFAULT nextval('public.accounts_userprofile_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: django_site id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_site ALTER COLUMN id SET DEFAULT nextval('public.django_site_id_seq'::regclass);


--
-- Name: djconfig_config id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.djconfig_config ALTER COLUMN id SET DEFAULT nextval('public.djconfig_config_id_seq'::regclass);


--
-- Name: photos_genericconfig id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_genericconfig ALTER COLUMN id SET DEFAULT nextval('public.photos_genericconfig_id_seq'::regclass);


--
-- Name: photos_magazine id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine ALTER COLUMN id SET DEFAULT nextval('public.photos_magazine_id_seq'::regclass);


--
-- Name: photos_magazine_user_likes id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine_user_likes ALTER COLUMN id SET DEFAULT nextval('public.photos_magazine_user_likes_id_seq'::regclass);


--
-- Name: photos_magazinearchivedfile id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinearchivedfile ALTER COLUMN id SET DEFAULT nextval('public.photos_magazinearchivedfile_id_seq'::regclass);


--
-- Name: photos_magazineattachedphoto id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazineattachedphoto ALTER COLUMN id SET DEFAULT nextval('public.photos_magazineattachedphoto_id_seq'::regclass);


--
-- Name: photos_magazinecategory cat_id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinecategory ALTER COLUMN cat_id SET DEFAULT nextval('public.photos_magazinecategory_cat_id_seq'::regclass);


--
-- Name: photos_magazinecomment cmt_id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinecomment ALTER COLUMN cmt_id SET DEFAULT nextval('public.photos_magazinecomment_cmt_id_seq'::regclass);


--
-- Name: photos_magazinefeature id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinefeature ALTER COLUMN id SET DEFAULT nextval('public.photos_magazinefeature_id_seq'::regclass);


--
-- Name: photos_magazinelike like_id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinelike ALTER COLUMN like_id SET DEFAULT nextval('public.photos_magazinelike_like_id_seq'::regclass);


--
-- Name: photos_magazinesubcategory cat_id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinesubcategory ALTER COLUMN cat_id SET DEFAULT nextval('public.photos_magazinesubcategory_cat_id_seq'::regclass);


--
-- Name: photos_photo id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photo ALTER COLUMN id SET DEFAULT nextval('public.photos_photo_id_seq'::regclass);


--
-- Name: photos_photo_user_likes id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photo_user_likes ALTER COLUMN id SET DEFAULT nextval('public.photos_photo_user_likes_id_seq'::regclass);


--
-- Name: photos_photocategory cat_id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photocategory ALTER COLUMN cat_id SET DEFAULT nextval('public.photos_photocategory_cat_id_seq'::regclass);


--
-- Name: photos_photocomment cmt_id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photocomment ALTER COLUMN cmt_id SET DEFAULT nextval('public.photos_photocomment_cmt_id_seq'::regclass);


--
-- Name: photos_photofeature id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photofeature ALTER COLUMN id SET DEFAULT nextval('public.photos_photofeature_id_seq'::regclass);


--
-- Name: photos_photolike like_id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photolike ALTER COLUMN like_id SET DEFAULT nextval('public.photos_photolike_like_id_seq'::regclass);


--
-- Name: social_auth_association id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_association ALTER COLUMN id SET DEFAULT nextval('public.social_auth_association_id_seq'::regclass);


--
-- Name: social_auth_code id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_code ALTER COLUMN id SET DEFAULT nextval('public.social_auth_code_id_seq'::regclass);


--
-- Name: social_auth_nonce id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_nonce ALTER COLUMN id SET DEFAULT nextval('public.social_auth_nonce_id_seq'::regclass);


--
-- Name: social_auth_partial id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_partial ALTER COLUMN id SET DEFAULT nextval('public.social_auth_partial_id_seq'::regclass);


--
-- Name: social_auth_usersocialauth id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_usersocialauth ALTER COLUMN id SET DEFAULT nextval('public.social_auth_usersocialauth_id_seq'::regclass);


--
-- Name: spirit_category_category id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_category_category ALTER COLUMN id SET DEFAULT nextval('public.spirit_category_category_id_seq'::regclass);


--
-- Name: spirit_comment_bookmark_commentbookmark id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_bookmark_commentbookmark ALTER COLUMN id SET DEFAULT nextval('public.spirit_comment_bookmark_commentbookmark_id_seq'::regclass);


--
-- Name: spirit_comment_comment id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_comment ALTER COLUMN id SET DEFAULT nextval('public.spirit_comment_comment_id_seq'::regclass);


--
-- Name: spirit_comment_flag_commentflag id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_commentflag ALTER COLUMN id SET DEFAULT nextval('public.spirit_comment_flag_commentflag_id_seq'::regclass);


--
-- Name: spirit_comment_flag_flag id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_flag ALTER COLUMN id SET DEFAULT nextval('public.spirit_comment_flag_flag_id_seq'::regclass);


--
-- Name: spirit_comment_history_commenthistory id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_history_commenthistory ALTER COLUMN id SET DEFAULT nextval('public.spirit_comment_history_commenthistory_id_seq'::regclass);


--
-- Name: spirit_comment_like_commentlike id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_like_commentlike ALTER COLUMN id SET DEFAULT nextval('public.spirit_comment_like_commentlike_id_seq'::regclass);


--
-- Name: spirit_comment_poll_commentpoll id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpoll ALTER COLUMN id SET DEFAULT nextval('public.spirit_comment_poll_commentpoll_id_seq'::regclass);


--
-- Name: spirit_comment_poll_commentpollchoice id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpollchoice ALTER COLUMN id SET DEFAULT nextval('public.spirit_comment_poll_commentpollchoice_id_seq'::regclass);


--
-- Name: spirit_comment_poll_commentpollvote id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpollvote ALTER COLUMN id SET DEFAULT nextval('public.spirit_comment_poll_commentpollvote_id_seq'::regclass);


--
-- Name: spirit_topic_favorite_topicfavorite id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_favorite_topicfavorite ALTER COLUMN id SET DEFAULT nextval('public.spirit_topic_favorite_topicfavorite_id_seq'::regclass);


--
-- Name: spirit_topic_notification_topicnotification id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_notification_topicnotification ALTER COLUMN id SET DEFAULT nextval('public.spirit_topic_notification_topicnotification_id_seq'::regclass);


--
-- Name: spirit_topic_private_topicprivate id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_private_topicprivate ALTER COLUMN id SET DEFAULT nextval('public.spirit_topic_private_topicprivate_id_seq'::regclass);


--
-- Name: spirit_topic_topic id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_topic ALTER COLUMN id SET DEFAULT nextval('public.spirit_topic_topic_id_seq'::regclass);


--
-- Name: spirit_topic_unread_topicunread id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_unread_topicunread ALTER COLUMN id SET DEFAULT nextval('public.spirit_topic_unread_topicunread_id_seq'::regclass);


--
-- Name: spirit_user_userprofile id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_user_userprofile ALTER COLUMN id SET DEFAULT nextval('public.spirit_user_userprofile_id_seq'::regclass);


--
-- Name: taggit_tag id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.taggit_tag ALTER COLUMN id SET DEFAULT nextval('public.taggit_tag_id_seq'::regclass);


--
-- Name: taggit_taggeditem id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.taggit_taggeditem ALTER COLUMN id SET DEFAULT nextval('public.taggit_taggeditem_id_seq'::regclass);


--
-- Name: token_blacklist_blacklistedtoken id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_blacklistedtoken_id_seq'::regclass);


--
-- Name: token_blacklist_outstandingtoken id; Type: DEFAULT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_outstandingtoken_id_seq'::regclass);


--
-- Data for Name: account_emailaddress; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.account_emailaddress (id, email, verified, "primary", user_id) FROM stdin;
\.


--
-- Data for Name: account_emailconfirmation; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.account_emailconfirmation (id, created, sent, key, email_address_id) FROM stdin;
\.


--
-- Data for Name: accounts_userprofile; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.accounts_userprofile (id, gender, dob, social_url, profile_photo, created_at, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add site	1	add_site
2	Can change site	1	change_site
3	Can delete site	1	delete_site
4	Can view site	1	view_site
5	Can add log entry	2	add_logentry
6	Can change log entry	2	change_logentry
7	Can delete log entry	2	delete_logentry
8	Can view log entry	2	view_logentry
9	Can add permission	3	add_permission
10	Can change permission	3	change_permission
11	Can delete permission	3	delete_permission
12	Can view permission	3	view_permission
13	Can add group	4	add_group
14	Can change group	4	change_group
15	Can delete group	4	delete_group
16	Can view group	4	view_group
17	Can add user	5	add_user
18	Can change user	5	change_user
19	Can delete user	5	delete_user
20	Can view user	5	view_user
21	Can add content type	6	add_contenttype
22	Can change content type	6	change_contenttype
23	Can delete content type	6	delete_contenttype
24	Can view content type	6	view_contenttype
25	Can add session	7	add_session
26	Can change session	7	change_session
27	Can delete session	7	delete_session
28	Can view session	7	view_session
29	Can add association	8	add_association
30	Can change association	8	change_association
31	Can delete association	8	delete_association
32	Can view association	8	view_association
33	Can add code	9	add_code
34	Can change code	9	change_code
35	Can delete code	9	delete_code
36	Can view code	9	view_code
37	Can add nonce	10	add_nonce
38	Can change nonce	10	change_nonce
39	Can delete nonce	10	delete_nonce
40	Can view nonce	10	view_nonce
41	Can add user social auth	11	add_usersocialauth
42	Can change user social auth	11	change_usersocialauth
43	Can delete user social auth	11	delete_usersocialauth
44	Can view user social auth	11	view_usersocialauth
45	Can add partial	12	add_partial
46	Can change partial	12	change_partial
47	Can delete partial	12	delete_partial
48	Can view partial	12	view_partial
49	Can add blacklisted token	13	add_blacklistedtoken
50	Can change blacklisted token	13	change_blacklistedtoken
51	Can delete blacklisted token	13	delete_blacklistedtoken
52	Can view blacklisted token	13	view_blacklistedtoken
53	Can add outstanding token	14	add_outstandingtoken
54	Can change outstanding token	14	change_outstandingtoken
55	Can delete outstanding token	14	delete_outstandingtoken
56	Can view outstanding token	14	view_outstandingtoken
57	Can add email address	15	add_emailaddress
58	Can change email address	15	change_emailaddress
59	Can delete email address	15	delete_emailaddress
60	Can view email address	15	view_emailaddress
61	Can add email confirmation	16	add_emailconfirmation
62	Can change email confirmation	16	change_emailconfirmation
63	Can delete email confirmation	16	delete_emailconfirmation
64	Can view email confirmation	16	view_emailconfirmation
65	Can add tag	17	add_tag
66	Can change tag	17	change_tag
67	Can delete tag	17	delete_tag
68	Can view tag	17	view_tag
69	Can add tagged item	18	add_taggeditem
70	Can change tagged item	18	change_taggeditem
71	Can delete tagged item	18	delete_taggeditem
72	Can view tagged item	18	view_taggeditem
73	Can add generic config	19	add_genericconfig
74	Can change generic config	19	change_genericconfig
75	Can delete generic config	19	delete_genericconfig
76	Can view generic config	19	view_genericconfig
77	Can add Magazine	20	add_magazine
78	Can change Magazine	20	change_magazine
79	Can delete Magazine	20	delete_magazine
80	Can view Magazine	20	view_magazine
81	Can add magazine category	21	add_magazinecategory
82	Can change magazine category	21	change_magazinecategory
83	Can delete magazine category	21	delete_magazinecategory
84	Can view magazine category	21	view_magazinecategory
85	Can add magazine sub category	22	add_magazinesubcategory
86	Can change magazine sub category	22	change_magazinesubcategory
87	Can delete magazine sub category	22	delete_magazinesubcategory
88	Can view magazine sub category	22	view_magazinesubcategory
89	Can add photo	23	add_photo
90	Can change photo	23	change_photo
91	Can delete photo	23	delete_photo
92	Can view photo	23	view_photo
93	Can add photo category	24	add_photocategory
94	Can change photo category	24	change_photocategory
95	Can delete photo category	24	delete_photocategory
96	Can view photo category	24	view_photocategory
97	Can add photo like	25	add_photolike
98	Can change photo like	25	change_photolike
99	Can delete photo like	25	delete_photolike
100	Can view photo like	25	view_photolike
101	Can add photo feature	26	add_photofeature
102	Can change photo feature	26	change_photofeature
103	Can delete photo feature	26	delete_photofeature
104	Can view photo feature	26	view_photofeature
105	Can add photo comment	27	add_photocomment
106	Can change photo comment	27	change_photocomment
107	Can delete photo comment	27	delete_photocomment
108	Can view photo comment	27	view_photocomment
109	Can add magazine like	28	add_magazinelike
110	Can change magazine like	28	change_magazinelike
111	Can delete magazine like	28	delete_magazinelike
112	Can view magazine like	28	view_magazinelike
113	Can add magazine feature	29	add_magazinefeature
114	Can change magazine feature	29	change_magazinefeature
115	Can delete magazine feature	29	delete_magazinefeature
116	Can view magazine feature	29	view_magazinefeature
117	Can add magazine comment	30	add_magazinecomment
118	Can change magazine comment	30	change_magazinecomment
119	Can delete magazine comment	30	delete_magazinecomment
120	Can view magazine comment	30	view_magazinecomment
121	Can add magazine attached photo	31	add_magazineattachedphoto
122	Can change magazine attached photo	31	change_magazineattachedphoto
123	Can delete magazine attached photo	31	delete_magazineattachedphoto
124	Can view magazine attached photo	31	view_magazineattachedphoto
125	Can add magazine archived file	32	add_magazinearchivedfile
126	Can change magazine archived file	32	change_magazinearchivedfile
127	Can delete magazine archived file	32	delete_magazinearchivedfile
128	Can view magazine archived file	32	view_magazinearchivedfile
129	Can add forum profile	33	add_userprofile
130	Can change forum profile	33	change_userprofile
131	Can delete forum profile	33	delete_userprofile
132	Can view forum profile	33	view_userprofile
133	Can add category	34	add_category
134	Can change category	34	change_category
135	Can delete category	34	delete_category
136	Can view category	34	view_category
137	Can add topic	35	add_topic
138	Can change topic	35	change_topic
139	Can delete topic	35	delete_topic
140	Can view topic	35	view_topic
141	Can add favorite	36	add_topicfavorite
142	Can change favorite	36	change_topicfavorite
143	Can delete favorite	36	delete_topicfavorite
144	Can view favorite	36	view_topicfavorite
145	Can add topic notification	37	add_topicnotification
146	Can change topic notification	37	change_topicnotification
147	Can delete topic notification	37	delete_topicnotification
148	Can view topic notification	37	view_topicnotification
149	Can add private topic	38	add_topicprivate
150	Can change private topic	38	change_topicprivate
151	Can delete private topic	38	delete_topicprivate
152	Can view private topic	38	view_topicprivate
153	Can add topic unread	39	add_topicunread
154	Can change topic unread	39	change_topicunread
155	Can delete topic unread	39	delete_topicunread
156	Can view topic unread	39	view_topicunread
157	Can add comment	40	add_comment
158	Can change comment	40	change_comment
159	Can delete comment	40	delete_comment
160	Can view comment	40	view_comment
161	Can add comment bookmark	41	add_commentbookmark
162	Can change comment bookmark	41	change_commentbookmark
163	Can delete comment bookmark	41	delete_commentbookmark
164	Can view comment bookmark	41	view_commentbookmark
165	Can add comment flag	42	add_commentflag
166	Can change comment flag	42	change_commentflag
167	Can delete comment flag	42	delete_commentflag
168	Can view comment flag	42	view_commentflag
169	Can add flag	43	add_flag
170	Can change flag	43	change_flag
171	Can delete flag	43	delete_flag
172	Can view flag	43	view_flag
173	Can add comment history	44	add_commenthistory
174	Can change comment history	44	change_commenthistory
175	Can delete comment history	44	delete_commenthistory
176	Can view comment history	44	view_commenthistory
177	Can add like	45	add_commentlike
178	Can change like	45	change_commentlike
179	Can delete like	45	delete_commentlike
180	Can view like	45	view_commentlike
181	Can add comment poll	46	add_commentpoll
182	Can change comment poll	46	change_commentpoll
183	Can delete comment poll	46	delete_commentpoll
184	Can view comment poll	46	view_commentpoll
185	Can add poll choice	47	add_commentpollchoice
186	Can change poll choice	47	change_commentpollchoice
187	Can delete poll choice	47	delete_commentpollchoice
188	Can view poll choice	47	view_commentpollchoice
189	Can add poll vote	48	add_commentpollvote
190	Can change poll vote	48	change_commentpollvote
191	Can delete poll vote	48	delete_commentpollvote
192	Can view poll vote	48	view_commentpollvote
193	Can add config	49	add_config
194	Can change config	49	change_config
195	Can delete config	49	delete_config
196	Can view config	49	view_config
197	Can add user profile	50	add_userprofile
198	Can change user profile	50	change_userprofile
199	Can delete user profile	50	delete_userprofile
200	Can view user profile	50	view_userprofile
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$216000$Dy7vTgWXcJ1c$G5ce3toC1yXsUuYwvwuWjCljJyCihNathcjTPDV64ns=	2021-06-19 12:48:39+00	t	admin	Admin		admin@example.com	t	t	2021-06-19 12:33:02+00
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2021-06-19 12:48:52.469928+00	1	default	1	[{"added": {}}]	19	1
2	2021-06-19 12:48:57.929782+00	1	default	2	[{"changed": {"fields": ["Show activities"]}}]	19	1
3	2021-06-19 12:49:42.234565+00	1	Thời trang	1	[{"added": {}}]	21	1
4	2021-06-19 12:50:06.354088+00	1	Lifestyle	1	[{"added": {}}]	22	1
5	2021-06-19 12:50:15.387445+00	1	Street	1	[{"added": {}}]	24	1
6	2021-06-19 12:53:57.305409+00	1	Street	1	[{"added": {}}]	23	1
7	2021-06-19 12:55:29.706726+00	1	Thời trang Lucete	1	[{"added": {}}, {"added": {"name": "magazine archived file", "object": "MagazineArchivedFile object (1)"}}]	20	1
8	2021-06-19 12:55:32.375453+00	1	Thời trang Lucete	2	[]	20	1
9	2021-06-19 12:55:59.446923+00	1	Thời trang Lucete	2	[{"changed": {"fields": ["Content", "Status"]}}]	20	1
10	2021-06-19 12:57:22.96087+00	1	Thời trang Lucete	2	[{"changed": {"fields": ["Thumbnail", "Banner"]}}]	20	1
11	2021-06-19 12:57:48.886792+00	1	admin	2	[{"changed": {"fields": ["First name"]}}]	5	1
12	2021-06-19 12:58:19.059355+00	2	tienvu461	3		5	1
13	2021-06-19 12:58:30.982558+00	1	Thời trang Lucete	2	[{"changed": {"fields": ["Status"]}}]	20	1
14	2021-06-19 12:58:39.752966+00	1	Street	2	[{"changed": {"fields": ["Status"]}}]	23	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	sites	site
2	admin	logentry
3	auth	permission
4	auth	group
5	auth	user
6	contenttypes	contenttype
7	sessions	session
8	social_django	association
9	social_django	code
10	social_django	nonce
11	social_django	usersocialauth
12	social_django	partial
13	token_blacklist	blacklistedtoken
14	token_blacklist	outstandingtoken
15	account	emailaddress
16	account	emailconfirmation
17	taggit	tag
18	taggit	taggeditem
19	photos	genericconfig
20	photos	magazine
21	photos	magazinecategory
22	photos	magazinesubcategory
23	photos	photo
24	photos	photocategory
25	photos	photolike
26	photos	photofeature
27	photos	photocomment
28	photos	magazinelike
29	photos	magazinefeature
30	photos	magazinecomment
31	photos	magazineattachedphoto
32	photos	magazinearchivedfile
33	spirit_user	userprofile
34	spirit_category	category
35	spirit_topic	topic
36	spirit_topic_favorite	topicfavorite
37	spirit_topic_notification	topicnotification
38	spirit_topic_private	topicprivate
39	spirit_topic_unread	topicunread
40	spirit_comment	comment
41	spirit_comment_bookmark	commentbookmark
42	spirit_comment_flag	commentflag
43	spirit_comment_flag	flag
44	spirit_comment_history	commenthistory
45	spirit_comment_like	commentlike
46	spirit_comment_poll	commentpoll
47	spirit_comment_poll	commentpollchoice
48	spirit_comment_poll	commentpollvote
49	djconfig	config
50	accounts	userprofile
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2021-06-19 12:32:58.185124+00
2	auth	0001_initial	2021-06-19 12:32:58.230281+00
3	account	0001_initial	2021-06-19 12:32:58.297319+00
4	account	0002_email_max_length	2021-06-19 12:32:58.320637+00
5	admin	0001_initial	2021-06-19 12:32:58.337124+00
6	admin	0002_logentry_remove_auto_add	2021-06-19 12:32:58.353895+00
7	admin	0003_logentry_add_action_flag_choices	2021-06-19 12:32:58.362466+00
8	contenttypes	0002_remove_content_type_name	2021-06-19 12:32:58.38125+00
9	auth	0002_alter_permission_name_max_length	2021-06-19 12:32:58.391049+00
10	auth	0003_alter_user_email_max_length	2021-06-19 12:32:58.400387+00
11	auth	0004_alter_user_username_opts	2021-06-19 12:32:58.409119+00
12	auth	0005_alter_user_last_login_null	2021-06-19 12:32:58.418058+00
13	auth	0006_require_contenttypes_0002	2021-06-19 12:32:58.420247+00
14	auth	0007_alter_validators_add_error_messages	2021-06-19 12:32:58.430424+00
15	auth	0008_alter_user_username_max_length	2021-06-19 12:32:58.443651+00
16	auth	0009_alter_user_last_name_max_length	2021-06-19 12:32:58.452968+00
17	auth	0010_alter_group_name_max_length	2021-06-19 12:32:58.464514+00
18	auth	0011_update_proxy_permissions	2021-06-19 12:32:58.474013+00
19	auth	0012_alter_user_first_name_max_length	2021-06-19 12:32:58.482807+00
20	djconfig	0001_initial	2021-06-19 12:32:58.495229+00
21	taggit	0001_initial	2021-06-19 12:32:58.522891+00
22	taggit	0002_auto_20150616_2121	2021-06-19 12:32:58.545504+00
23	taggit	0003_taggeditem_add_unique_index	2021-06-19 12:32:58.55433+00
24	photos	0001_initial	2021-06-19 12:32:58.962673+00
25	sessions	0001_initial	2021-06-19 12:32:59.066813+00
26	sites	0001_initial	2021-06-19 12:32:59.082354+00
27	sites	0002_alter_domain_unique	2021-06-19 12:32:59.093454+00
28	default	0001_initial	2021-06-19 12:32:59.168231+00
29	social_auth	0001_initial	2021-06-19 12:32:59.169582+00
30	default	0002_add_related_name	2021-06-19 12:32:59.209959+00
31	social_auth	0002_add_related_name	2021-06-19 12:32:59.211357+00
32	default	0003_alter_email_max_length	2021-06-19 12:32:59.218136+00
33	social_auth	0003_alter_email_max_length	2021-06-19 12:32:59.219353+00
34	default	0004_auto_20160423_0400	2021-06-19 12:32:59.236877+00
35	social_auth	0004_auto_20160423_0400	2021-06-19 12:32:59.238315+00
36	social_auth	0005_auto_20160727_2333	2021-06-19 12:32:59.245485+00
37	social_django	0006_partial	2021-06-19 12:32:59.256116+00
38	social_django	0007_code_timestamp	2021-06-19 12:32:59.266773+00
39	social_django	0008_partial_timestamp	2021-06-19 12:32:59.275427+00
40	social_django	0009_auto_20191118_0520	2021-06-19 12:32:59.309976+00
41	social_django	0010_uid_db_index	2021-06-19 12:32:59.32982+00
42	spirit_category	0001_initial	2021-06-19 12:32:59.338388+00
43	spirit_category	0002_auto_20150728_0442	2021-06-19 12:32:59.371165+00
44	spirit_category	0003_category_is_global	2021-06-19 12:32:59.377722+00
45	spirit_category	0004_category_color	2021-06-19 12:32:59.384291+00
46	spirit_category	0005_category_reindex_at	2021-06-19 12:32:59.390679+00
47	spirit_category	0006_auto_20190120_0406	2021-06-19 12:32:59.422687+00
48	spirit_topic	0001_initial	2021-06-19 12:32:59.452278+00
49	spirit_comment	0001_initial	2021-06-19 12:32:59.492097+00
50	spirit_comment	0002_auto_20150828_2003	2021-06-19 12:32:59.532258+00
51	spirit_comment	0003_auto_20151115_0400	2021-06-19 12:32:59.561466+00
52	spirit_comment	0004_auto_20160315_2021	2021-06-19 12:32:59.580581+00
53	spirit_comment_bookmark	0001_initial	2021-06-19 12:32:59.63097+00
54	spirit_comment_bookmark	0002_auto_20150828_2003	2021-06-19 12:32:59.671872+00
55	spirit_comment_flag	0001_initial	2021-06-19 12:32:59.757184+00
56	spirit_comment_flag	0002_auto_20150828_2003	2021-06-19 12:32:59.911267+00
57	spirit_comment_history	0001_initial	2021-06-19 12:32:59.946619+00
58	spirit_comment_like	0001_initial	2021-06-19 12:33:00.004713+00
59	spirit_comment_like	0002_auto_20150828_2003	2021-06-19 12:33:00.049482+00
60	spirit_comment_poll	0001_initial	2021-06-19 12:33:00.194237+00
61	spirit_comment_poll	0002_auto_20190304_2115	2021-06-19 12:33:00.227249+00
62	spirit_topic	0002_auto_20150828_2003	2021-06-19 12:33:00.264602+00
63	spirit_topic	0003_topic_reindex_at	2021-06-19 12:33:00.288188+00
64	spirit_topic_favorite	0001_initial	2021-06-19 12:33:00.345431+00
65	spirit_topic_favorite	0002_auto_20150828_2003	2021-06-19 12:33:00.390898+00
66	spirit_topic_notification	0001_initial	2021-06-19 12:33:00.453771+00
67	spirit_topic_notification	0002_auto_20150828_2003	2021-06-19 12:33:00.589781+00
68	spirit_topic_private	0001_initial	2021-06-19 12:33:00.649418+00
69	spirit_topic_private	0002_auto_20150828_2003	2021-06-19 12:33:00.695294+00
70	spirit_topic_unread	0001_initial	2021-06-19 12:33:00.756364+00
71	spirit_topic_unread	0002_auto_20150828_2003	2021-06-19 12:33:00.803798+00
72	spirit_user	0001_initial	2021-06-19 12:33:00.877009+00
73	spirit_user	0002_auto_20150728_0447	2021-06-19 12:33:00.96839+00
74	spirit_user	0003_auto_20150728_0448	2021-06-19 12:33:01.006231+00
75	spirit_user	0004_auto_20150731_2351	2021-06-19 12:33:01.044574+00
76	spirit_user	0005_auto_20160515_0318	2021-06-19 12:33:01.176745+00
77	spirit_user	0006_auto_20160606_0607	2021-06-19 12:33:01.202328+00
78	spirit_user	0007_auto_20161114_1536	2021-06-19 12:33:01.239178+00
79	spirit_user	0008_auto_20161114_1707	2021-06-19 12:33:01.307509+00
80	spirit_user	0009_auto_20161114_1850	2021-06-19 12:33:01.342789+00
81	spirit_user	0010_userprofile_nickname	2021-06-19 12:33:01.369016+00
82	spirit_user	0011_auto_20181124_2320	2021-06-19 12:33:01.440094+00
83	spirit_user	0012_userprofile_avatar	2021-06-19 12:33:01.465959+00
84	spirit_user	0013_userprofile_notify	2021-06-19 12:33:01.493527+00
85	token_blacklist	0001_initial	2021-06-19 12:33:01.584993+00
86	token_blacklist	0002_outstandingtoken_jti_hex	2021-06-19 12:33:01.616713+00
87	token_blacklist	0003_auto_20171017_2007	2021-06-19 12:33:01.656946+00
88	token_blacklist	0004_auto_20171017_2013	2021-06-19 12:33:01.787078+00
89	token_blacklist	0005_remove_outstandingtoken_jti	2021-06-19 12:33:01.814526+00
90	token_blacklist	0006_auto_20171017_2113	2021-06-19 12:33:01.843143+00
91	token_blacklist	0007_auto_20171017_2214	2021-06-19 12:33:01.909098+00
92	social_django	0001_initial	2021-06-19 12:33:01.913728+00
93	social_django	0002_add_related_name	2021-06-19 12:33:01.915897+00
94	social_django	0005_auto_20160727_2333	2021-06-19 12:33:01.918035+00
95	social_django	0004_auto_20160423_0400	2021-06-19 12:33:01.920051+00
96	social_django	0003_alter_email_max_length	2021-06-19 12:33:01.922306+00
97	accounts	0001_initial	2021-06-19 12:46:49.948756+00
98	auth	0013_auto_20210619_1946	2021-06-19 12:46:49.998897+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
yd0g5wn13si5vfkmv2mbh3ww94rwc5fk	e30:1luaNb:DNsB39ii1L5Kf0HWblFavmhIncCmC4OLQFipnPx6-aM	2021-07-03 12:47:19.098022+00
bilrlzefq293c33wricei1zypl4aqd14	e30:1luaNk:8tZieaE_TeINTrhomiOpEfKWD6Nf7UVqypmoDevaHds	2021-07-03 12:47:28.716493+00
9p55sen458n5eepx14g53xtl48c1usvt	.eJxVjsFqwzAQRP9F59ayFFm2cwy0h4AhUHoWK-3GVmtbRpZDaOm_V4Yc2uvMvMd8MwNbGsy2UjQe2ZEJ9vQ3s-A-ad4L_IC5D4ULc4reFvukeLRr0QWk8fTY_hMMsA6Z1haAQFdOlrY9SERUjZSgBdWiJNeis42qlL6WlSprfRAWVa2VA1E1LQFlaST0kVwyW_TZOKS0HDmHxRfJ03y75WsTB-fCNqeVLzFc_Ug8g30I_UjPYT8lzZogUea7TUp9VuktXNo79q8vwzS996r50vF0RurYzy_gAl-K:1luaUN:_l_-Dbd_V-i9pBt_5Ev3wZagdYCx-MqzX4ErHqcyM6U	2021-07-03 12:54:19.156181+00
\.


--
-- Data for Name: django_site; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.django_site (id, domain, name) FROM stdin;
2	example.com	example.com
\.


--
-- Data for Name: djconfig_config; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.djconfig_config (id, key, value) FROM stdin;
\.


--
-- Data for Name: photos_genericconfig; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_genericconfig (id, config_name, short_description, likes_interact_weight, comments_interact_weight, views_interact_weight, show_activities, in_use, site_name) FROM stdin;
1	default	Description	10	10	10	t	t	api.tienvv.com
\.


--
-- Data for Name: photos_magazine; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_magazine (id, title, slug, thumbnail, banner, content, status, view_count, created_at, updated_at, author_id, category_id, sub_category_id) FROM stdin;
1	Thời trang Lucete	thi-trang-lucete	2021/06/19/Mask_Group_1.png	2021/06/19/michelle-obama-gty-aa-191212_hpMain_16x9t_1600_1.png	# Hướng dẫn chi tiết đối với LUCETE's Fashion Reporter\r\n\r\nĐọc kỹ các thông tin sau, mọi thắc mắc liên hệ qua email: info@lucete.vn hoặc số điện thoại của người phụ trách: 0962 517 735 (Quỳnh Anh)\r\n\r\n# 🔻Mô tả công việc\r\n\r\nMột fashion reporter tại LUCETE được hiểu như một phóng viên ảnh tự do. Công việc chính là chụp lại những outfit xuất hiện trên đường phố, thể hiện phong cách cá nhân của người mặc, đẹp, cuốn hút, có style và cá tính riêng, họ có thể là nam hoặc nữ không phân biệt giới tính, độ tuổi trưởng thành (từ 20 trở lên tùy vào phong cách họ thể hiện).\r\n\r\n# 🔻Quá trình tuyển dụng\r\n\r\n### 1️⃣ Nộp hồ sơ:\r\n\r\nNộp CV kèm Portfolio (hoặc file lưu trữ các sản phẩm đã thực hiện) trực tiếp qua email info@lucete.vn. Tiêu đề thư ghi: Ứng tuyển Fashion Reporter - Họ và tên\r\n\r\n### 2️⃣ Đăng ký trở thành Fashion Reporter:\r\n\r\nNhững hồ sơ lọt qua vòng chọn lọc đầu tiên sẽ nhận được email xác nhận. Việc của bạn là chuẩn bị ảnh chụp hai mặt CMND / CCCD và số tài khoản ngân hàng, tên tài khoản Instagram và Facebook, sau đó gửi các thông tin cần thiết qua địa chỉ email của công ty\r\n\r\n### 3️⃣ Chụp hình và gửi về Bộ phận quản lý:\r\n\r\nTất cả các fashion reporter sau khi đăng ký sẽ được mặc định ở Level 1. Nhiệm vụ của bạn là chụp những outfit có chất lượng tốt, xin thông tin của người chụp, ghi lại những điểm đặc biệt và gửi dữ liệu về Bộ phận quản lý.\r\n\r\n### 4️⃣ Lọc hình và đăng tải\r\n\r\nNhững hình ảnh đúng tiêu chí, đúng tiêu chuẩn sẽ được xử lý hậu kỳ và đăng tải lên page của LUCETE. Sau khi đăng tải, lượt tương tác với hình ảnh sẽ là cơ sở để đánh giá chất lượng hình mà người fashion reporter đó cung cấp.\r\n\r\nChi tiết về concept xin tham khảo "TIÊU CHUẨN HÌNH ẢNH" phía dưới\r\n\r\n### 5️⃣ Tổng cộng thu nhập trong tháng và quyết toán\r\n\r\nLUCETE sẽ trả thù lao theo số lượng outfit của bạn được đăng tải, người có nhiều outfit tốt được đăng tải với lượt tương tác cao sẽ được nâng hạng và mức thù lao nhận được sẽ tương đương với hạng mức đó.\r\n\r\n# 🔻Thù lao theo xếp hạng\r\n\r\n### Level 1\r\n\r\nSL hiện tại: 01\r\n\r\n---\r\n\r\nThù lao:\r\n**40,000VND/1 outfit**\r\n\r\n---\r\n\r\nTất cả fashion reporter sau khi đăng kí sẽ mặc định ở Level 1. Chỉ cần đạt 3  outfit được đăng tải sẽ được thăng hạng\r\n\r\n### Level 2\r\n\r\nSL hiện tại: 02\r\n\r\n---\r\n\r\nThù lao:\r\n**80,000VND/1 outfit & được cung cấp namecard**\r\n\r\n---\r\n\r\nSau mỗi quý xếp hạng của một fashion reporter sẽ được đánh giá bởi Đội ngũ quản lý và lượt tương tác với các hình ảnh được đăng tải\r\n\r\n### Level 3\r\n\r\nSL hiện tại: 0\r\n\r\n---\r\n\r\nThù lao\r\n**150,000VND/1 outfit & được cung cấp namecard**\r\n\r\n---\r\n\r\nSau mỗi quý xếp hạng của một fashion reporter sẽ được đánh giá bởi Đội ngũ quản lý và lượt tương tác với các hình ảnh được đăng tải\r\n\r\n### Level 4\r\n\r\nSL hiện tại: 01\r\n\r\n---\r\n\r\nThù lao\r\n**250,000VND/1 outfit & được cung cấp namecard và ID card**\r\n\r\n---\r\n\r\nSau mỗi quý xếp hạng của một fashion reporter sẽ được đánh giá bởi Đội ngũ quản lý và lượt tương tác với các hình ảnh được đăng tải\r\n\r\n### Master\r\n\r\nSL hiện tại: 0\r\n\r\n---\r\n\r\nThù lao\r\n**400,000VND/1 outfit & được cung cấp namecard và ID card**\r\n\r\n---\r\n\r\nSau mỗi quý xếp hạng của một fashion reporter sẽ được đánh giá bởi Đội ngũ quản lý và lượt tương tác với các hình ảnh được đăng tải\r\n\r\n1. Những hình ảnh không thể đăng tải trực tiếp lên page vì chất lượng outfit hoặc lỗi kĩ thuật nhưng có thể sử dụng hỗ trợ các bài content sẽ được trả ở mức 25,000VND/1 outfit\r\n2. Thù lao LUCETE chi trả cho mỗi outfit là mức chi cho quá trình người photographer bỏ ra (nó có thể là trang thiết bị, thời gian, công sức,...) để ghi lại những hình ảnh đó\r\n3. Tăng hạng dựa vào hai yếu tố: lượng tương tác với hình ảnh và đánh giá của Đội ngũ quản lý. Những fashion reporter có nhiều outfit tương tác cao, chất lượng hình ảnh tốt, số lượng cung cấp ổn định trong vòng một quý có thể được thăng hai hạng liên tiếp. Ngược lại nếu người fashion reporter không hoạt động ổn định trong quý có thể bị trừ hạng.\r\n4. Đối với Hạng Master, ngoài các khoản thù lao nhận được, có cơ hội trao đổi trực tiếp mức thu nhập mong muốn đối với mỗi outfit\r\n\r\nMục đích của hệ thống là tạo động lực, khuyến khích các fashion reporter sáng tạo, tự tìm ra cách làm việc hiệu quả, để thu thập các hình ảnh chất lượng tốt và không ngừng phát triển kỹ năng nhiếp ảnh và cảm nhận thời trang của bản thân.\r\n\r\n# 🔻Tiêu chuẩn hình ảnh\r\n\r\nCác hình ảnh đúng tiêu chí có thể hình dung như sau:\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_9161.jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_9161.jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_9166.jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_9166.jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_9164.jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_9164.jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_9165.jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_9165.jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_8120_copy.jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_8120_copy.jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_8128_copy.jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_8128_copy.jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_8124_copy.jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_8124_copy.jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_8131_copy_(1).jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_8131_copy_(1).jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_7982_copy_(1).jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_7982_copy_(1).jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_7994_copy_(1).jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_7994_copy_(1).jpg)\r\n\r\n![Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_7989_copy.jpg](http://api.tienvv.com/backend_media/attached/2021/06/19/Hu%CC%9Bo%CC%9B%CC%81ng%20da%CC%82%CC%83n%20chi%20tie%CC%82%CC%81t%20%C4%91o%CC%82%CC%81i%20vo%CC%9B%CC%81i%20LUCETE's%20Fas%20e219acc2d3ee4d03b531c7d8674a5464/_MG_7989_copy.jpg)\r\n\r\nKhông giới hạn về các phong cách thời trang được chụp\r\n\r\n👉**Các outfit đúng định hướng của LUCETE là**\r\n\r\n- Bản thân người fashion reporter thấy được điểm thu hút trong outfit đó\r\n- Thể hiện được phong cách cá nhân của người mặc (outfit có thể giản dị, có thể cầu kỳ nhưng nó thể hiện style và cá tính riêng)\r\n- Outfit này có thể tạo cảm hứng cho người xem, giúp họ học hỏi được cách kết hợp trang phục, cách nhìn nhận về thời trang và biết được rằng thời trang Việt cũng có tiếng nói riêng\r\n\r\n👉**Một outfit phải có ít nhất 3 hình ảnh**\r\n\r\nBao gồm 1 đến 2 hình ảnh tổng quan (full-body) và các hình ảnh chi tiết (màu sắc, chất liệu, hình dáng, form dáng, phụ kiện... những điểm đặc biệt của outfit)\r\n\r\n👉**Luôn cân nhắc khoảng không gian trống giữa chủ thể và khung hình**\r\n\r\nVì đội ngũ hậu kỳ sẽ điều chỉnh kích thước hình ảnh đúng theo chuẩn Instagram, vì vậy các fashion reporter phải lưu ý khoảng không gian trống để khi crop hình không bị ảnh hưởng vào chủ thể\r\n\r\nTham khảo thêm tại Instagram của LUCETE:\r\n\r\n[https://www.instagram.com/lucete_vn/](https://www.instagram.com/lucete_vn/)\r\n\r\n**Hãy cố gắng lưu giữ khoảnh khắc và câu chuyện**\r\n\r\nOutfit đẹp được ghi lại trong một bức hình chứa đựng tất cả tiêu chí trên và lưu giữ chính xác khoảnh khắc đẹp nhất của đối tượng trong không gian đó, đây là tiêu chí cao nhất mà LUCETE mong muốn mọi fashion reporter lấy đó làm động lực phát triển.\r\n\r\n# 🔻Lưu ý\r\n\r\n1. Định nghĩa "outfit" trong bộ Guidelines: là một đơn vị tính. Mỗi outfit gồm nhiều hình ảnh liên quan đến bộ trang phục đó\r\n2. Không chụp lén, chụp giấu mặt. Khi hình ảnh được gửi về mặc định người fashion reporter đã có sự thỏa thuận và đồng ý của các bên liên quan, mọi vấn đề phát sinh sẽ do người chụp chịu trách nhiệm. Tất cả các outfit chụp đều phải xin ý kiến và thu thập thông tin của người được chụp, bao gồm:\r\n    - Họ và tên\r\n    - Tuổi & giới tính\r\n    - Nghề nghiệp hiện tại\r\n    - Instagram và Facebook (để tag họ nếu upload hình ảnh)\r\n    - Phong cách\r\n3. Hình ảnh gửi về phải là file raw, chưa qua xử lý \r\n4. Không sử dụng camera điện thoại, hình ảnh được chụp phải từ máy ảnh DSLR, lens sử dụng tầm trung trở lên\r\n5. Các hình ảnh được chụp không được bao gồm mục đích thương mại (PR trá hình cho sản phẩm, bán hàng, gửi cho bên thứ 3 để thu lợi nhuận)\r\n6. Tất cả các hình ảnh đã được chi trả đều thuộc bản quyền của LUCETE. Khi đăng tải LUCETE sẽ ghi rõ nguồn hình (tag account của fashion reporter vào bài đăng)\r\n\r\nMọi thắc mắc vui lòng gửi về địa chỉ email: info@lucete.vn hoặc liên hệ số điện thoại người phụ trách: 0962 517 735 (Quỳnh Anh) để được hỗ trợ.	0	3	2021-06-19 12:55:29.633684+00	2021-06-19 12:58:30.976742+00	1	1	1
\.


--
-- Data for Name: photos_magazine_user_likes; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_magazine_user_likes (id, magazine_id, user_id) FROM stdin;
\.


--
-- Data for Name: photos_magazinearchivedfile; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_magazinearchivedfile (id, zip_file, magazine_id) FROM stdin;
\.


--
-- Data for Name: photos_magazineattachedphoto; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_magazineattachedphoto (id, image, magazine_id) FROM stdin;
1	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_9161.jpg	1
2	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_9166.jpg	1
3	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_9164.jpg	1
4	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_9165.jpg	1
5	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_8120_copy.jpg	1
6	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_8128_copy.jpg	1
7	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_8124_copy.jpg	1
8	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_8131_copy_1.jpg	1
9	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_7982_copy_1.jpg	1
10	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_7994_copy_1.jpg	1
11	attached/2021/06/19/Hướng dẫn chi tiết đối với LUCETE's Fas e219acc2d3ee4d03b531c7d8674a5464/_MG_7989_copy.jpg	1
\.


--
-- Data for Name: photos_magazinecategory; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_magazinecategory (cat_id, cat_name, description, created_at, updated_at, "order") FROM stdin;
1	Thời trang	thời trang	2021-06-19 12:49:42.232135+00	2021-06-19 12:49:42.232157+00	100
\.


--
-- Data for Name: photos_magazinecomment; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_magazinecomment (cmt_id, content, active, created_at, updated_at, magazine_id_id, parent_id, user_id_id) FROM stdin;
\.


--
-- Data for Name: photos_magazinefeature; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_magazinefeature (id, in_use, created_at, updated_at, feature_magazine_id) FROM stdin;
\.


--
-- Data for Name: photos_magazinelike; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_magazinelike (like_id, is_enabled, created_at, updated_at, magazine_id_id, user_id_id) FROM stdin;
\.


--
-- Data for Name: photos_magazinesubcategory; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_magazinesubcategory (cat_id, cat_name, description, created_at, updated_at, "order") FROM stdin;
1	Lifestyle	lifestyle	2021-06-19 12:50:06.353053+00	2021-06-19 12:50:06.353073+00	200
\.


--
-- Data for Name: photos_photo; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_photo (id, title, slug, model_name, model_job, shoot_date, location, brand, style, photographer, social_url, post_date, image_path, status, view_count, created_at, updated_at, category_id) FROM stdin;
1	Street	street	Alibaba	Engineer	\N	Mặt trăng	Bitis	Street	Chú Cuội	cuoi@moon.vn	2021-06-19 12:58:39.745682+00	2021/06/19/_MG_7982_copy_1.jpg	0	1	2021-06-19 12:53:57.291171+00	2021-06-19 12:58:39.745702+00	1
\.


--
-- Data for Name: photos_photo_user_likes; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_photo_user_likes (id, photo_id, user_id) FROM stdin;
\.


--
-- Data for Name: photos_photocategory; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_photocategory (cat_id, cat_name, description, created_at, updated_at) FROM stdin;
1	Street	street	2021-06-19 12:50:15.385821+00	2021-06-19 12:50:15.385859+00
\.


--
-- Data for Name: photos_photocomment; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_photocomment (cmt_id, content, active, created_at, updated_at, parent_id, photo_id_id, user_id_id) FROM stdin;
\.


--
-- Data for Name: photos_photofeature; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_photofeature (id, in_use, created_at, updated_at, feature_photo_id, login_photo_id, popup_photo_id, signup_photo_id, subscribe_photo_id) FROM stdin;
\.


--
-- Data for Name: photos_photolike; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.photos_photolike (like_id, is_enabled, created_at, updated_at, photo_id_id, user_id_id) FROM stdin;
\.


--
-- Data for Name: social_auth_association; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.social_auth_association (id, server_url, handle, secret, issued, lifetime, assoc_type) FROM stdin;
\.


--
-- Data for Name: social_auth_code; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.social_auth_code (id, email, code, verified, "timestamp") FROM stdin;
\.


--
-- Data for Name: social_auth_nonce; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.social_auth_nonce (id, server_url, "timestamp", salt) FROM stdin;
\.


--
-- Data for Name: social_auth_partial; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.social_auth_partial (id, token, next_step, backend, data, "timestamp") FROM stdin;
\.


--
-- Data for Name: social_auth_usersocialauth; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.social_auth_usersocialauth (id, provider, uid, extra_data, user_id, created, modified) FROM stdin;
\.


--
-- Data for Name: spirit_cache; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_cache (cache_key, value, expires) FROM stdin;
\.


--
-- Data for Name: spirit_category_category; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_category_category (id, title, slug, description, is_closed, is_removed, is_private, parent_id, is_global, color, reindex_at, sort) FROM stdin;
1	Private	private		f	f	t	\N	t		2021-06-19 12:32:59.388515+00	1
2	Uncategorized	uncategorized		f	f	f	\N	t		2021-06-19 12:32:59.388515+00	2
\.


--
-- Data for Name: spirit_comment_bookmark_commentbookmark; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_comment_bookmark_commentbookmark (id, comment_number, topic_id, user_id) FROM stdin;
\.


--
-- Data for Name: spirit_comment_comment; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_comment_comment (id, comment, comment_html, action, date, is_removed, is_modified, ip_address, modified_count, likes_count, topic_id, user_id) FROM stdin;
\.


--
-- Data for Name: spirit_comment_flag_commentflag; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_comment_flag_commentflag (id, date, is_closed, comment_id, moderator_id) FROM stdin;
\.


--
-- Data for Name: spirit_comment_flag_flag; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_comment_flag_flag (id, date, reason, body, comment_id, user_id) FROM stdin;
\.


--
-- Data for Name: spirit_comment_history_commenthistory; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_comment_history_commenthistory (id, comment_html, date, comment_fk_id) FROM stdin;
\.


--
-- Data for Name: spirit_comment_like_commentlike; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_comment_like_commentlike (id, date, comment_id, user_id) FROM stdin;
\.


--
-- Data for Name: spirit_comment_poll_commentpoll; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_comment_poll_commentpoll (id, name, title, choice_min, choice_max, mode, close_at, is_removed, created_at, comment_id) FROM stdin;
\.


--
-- Data for Name: spirit_comment_poll_commentpollchoice; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_comment_poll_commentpollchoice (id, number, description, vote_count, is_removed, poll_id) FROM stdin;
\.


--
-- Data for Name: spirit_comment_poll_commentpollvote; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_comment_poll_commentpollvote (id, is_removed, created_at, choice_id, voter_id) FROM stdin;
\.


--
-- Data for Name: spirit_rl_cache; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_rl_cache (cache_key, value, expires) FROM stdin;
\.


--
-- Data for Name: spirit_topic_favorite_topicfavorite; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_topic_favorite_topicfavorite (id, date, topic_id, user_id) FROM stdin;
\.


--
-- Data for Name: spirit_topic_notification_topicnotification; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_topic_notification_topicnotification (id, date, action, is_read, is_active, comment_id, topic_id, user_id) FROM stdin;
\.


--
-- Data for Name: spirit_topic_private_topicprivate; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_topic_private_topicprivate (id, date, topic_id, user_id) FROM stdin;
\.


--
-- Data for Name: spirit_topic_topic; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_topic_topic (id, title, slug, date, last_active, is_pinned, is_globally_pinned, is_closed, is_removed, view_count, comment_count, category_id, user_id, reindex_at) FROM stdin;
\.


--
-- Data for Name: spirit_topic_unread_topicunread; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_topic_unread_topicunread (id, date, is_read, topic_id, user_id) FROM stdin;
\.


--
-- Data for Name: spirit_user_userprofile; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.spirit_user_userprofile (id, slug, location, last_seen, last_ip, timezone, is_administrator, is_moderator, is_verified, topic_count, comment_count, user_id, last_post_hash, last_post_on, nickname, avatar, notify) FROM stdin;
1	admin		2021-06-19 12:57:48.882126+00	172.32.0.2	UTC	t	t	f	0	0	1		2021-06-19 12:48:27.927496+00	admin		1
\.


--
-- Data for Name: taggit_tag; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.taggit_tag (id, name, slug) FROM stdin;
1	street	street
2	lucete	lucete
\.


--
-- Data for Name: taggit_taggeditem; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.taggit_taggeditem (id, object_id, content_type_id, tag_id) FROM stdin;
1	1	23	1
2	1	20	2
\.


--
-- Data for Name: token_blacklist_blacklistedtoken; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.token_blacklist_blacklistedtoken (id, blacklisted_at, token_id) FROM stdin;
\.


--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: fashion_info
--

COPY public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) FROM stdin;
\.


--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.account_emailaddress_id_seq', 1, false);


--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.account_emailconfirmation_id_seq', 1, false);


--
-- Name: accounts_userprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.accounts_userprofile_id_seq', 1, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 200, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 2, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 14, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 50, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 98, true);


--
-- Name: django_site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.django_site_id_seq', 2, true);


--
-- Name: djconfig_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.djconfig_config_id_seq', 1, false);


--
-- Name: photos_genericconfig_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_genericconfig_id_seq', 1, true);


--
-- Name: photos_magazine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_magazine_id_seq', 1, true);


--
-- Name: photos_magazine_user_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_magazine_user_likes_id_seq', 1, false);


--
-- Name: photos_magazinearchivedfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_magazinearchivedfile_id_seq', 1, true);


--
-- Name: photos_magazineattachedphoto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_magazineattachedphoto_id_seq', 11, true);


--
-- Name: photos_magazinecategory_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_magazinecategory_cat_id_seq', 1, true);


--
-- Name: photos_magazinecomment_cmt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_magazinecomment_cmt_id_seq', 1, false);


--
-- Name: photos_magazinefeature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_magazinefeature_id_seq', 1, false);


--
-- Name: photos_magazinelike_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_magazinelike_like_id_seq', 1, false);


--
-- Name: photos_magazinesubcategory_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_magazinesubcategory_cat_id_seq', 1, true);


--
-- Name: photos_photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_photo_id_seq', 1, true);


--
-- Name: photos_photo_user_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_photo_user_likes_id_seq', 1, false);


--
-- Name: photos_photocategory_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_photocategory_cat_id_seq', 1, true);


--
-- Name: photos_photocomment_cmt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_photocomment_cmt_id_seq', 1, false);


--
-- Name: photos_photofeature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_photofeature_id_seq', 1, false);


--
-- Name: photos_photolike_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.photos_photolike_like_id_seq', 1, false);


--
-- Name: social_auth_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.social_auth_association_id_seq', 1, false);


--
-- Name: social_auth_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.social_auth_code_id_seq', 1, false);


--
-- Name: social_auth_nonce_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.social_auth_nonce_id_seq', 1, false);


--
-- Name: social_auth_partial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.social_auth_partial_id_seq', 1, false);


--
-- Name: social_auth_usersocialauth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.social_auth_usersocialauth_id_seq', 1, true);


--
-- Name: spirit_category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_category_category_id_seq', 2, true);


--
-- Name: spirit_comment_bookmark_commentbookmark_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_comment_bookmark_commentbookmark_id_seq', 1, false);


--
-- Name: spirit_comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_comment_comment_id_seq', 1, false);


--
-- Name: spirit_comment_flag_commentflag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_comment_flag_commentflag_id_seq', 1, false);


--
-- Name: spirit_comment_flag_flag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_comment_flag_flag_id_seq', 1, false);


--
-- Name: spirit_comment_history_commenthistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_comment_history_commenthistory_id_seq', 1, false);


--
-- Name: spirit_comment_like_commentlike_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_comment_like_commentlike_id_seq', 1, false);


--
-- Name: spirit_comment_poll_commentpoll_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_comment_poll_commentpoll_id_seq', 1, false);


--
-- Name: spirit_comment_poll_commentpollchoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_comment_poll_commentpollchoice_id_seq', 1, false);


--
-- Name: spirit_comment_poll_commentpollvote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_comment_poll_commentpollvote_id_seq', 1, false);


--
-- Name: spirit_topic_favorite_topicfavorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_topic_favorite_topicfavorite_id_seq', 1, false);


--
-- Name: spirit_topic_notification_topicnotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_topic_notification_topicnotification_id_seq', 1, false);


--
-- Name: spirit_topic_private_topicprivate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_topic_private_topicprivate_id_seq', 1, false);


--
-- Name: spirit_topic_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_topic_topic_id_seq', 1, false);


--
-- Name: spirit_topic_unread_topicunread_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_topic_unread_topicunread_id_seq', 1, false);


--
-- Name: spirit_user_userprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.spirit_user_userprofile_id_seq', 2, true);


--
-- Name: taggit_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.taggit_tag_id_seq', 2, true);


--
-- Name: taggit_taggeditem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.taggit_taggeditem_id_seq', 2, true);


--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.token_blacklist_blacklistedtoken_id_seq', 1, false);


--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fashion_info
--

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 1, true);


--
-- Name: account_emailaddress account_emailaddress_email_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_email_key UNIQUE (email);


--
-- Name: account_emailaddress account_emailaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_pkey PRIMARY KEY (id);


--
-- Name: account_emailconfirmation account_emailconfirmation_key_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_key_key UNIQUE (key);


--
-- Name: account_emailconfirmation account_emailconfirmation_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_pkey PRIMARY KEY (id);


--
-- Name: accounts_userprofile accounts_userprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_pkey PRIMARY KEY (id);


--
-- Name: accounts_userprofile accounts_userprofile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_user_id_key UNIQUE (user_id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user auth_user_email_1c89df09_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_email_1c89df09_uniq UNIQUE (email);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: django_site django_site_domain_a2e37b91_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_domain_a2e37b91_uniq UNIQUE (domain);


--
-- Name: django_site django_site_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);


--
-- Name: djconfig_config djconfig_config_key_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.djconfig_config
    ADD CONSTRAINT djconfig_config_key_key UNIQUE (key);


--
-- Name: djconfig_config djconfig_config_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.djconfig_config
    ADD CONSTRAINT djconfig_config_pkey PRIMARY KEY (id);


--
-- Name: photos_genericconfig photos_genericconfig_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_genericconfig
    ADD CONSTRAINT photos_genericconfig_pkey PRIMARY KEY (id);


--
-- Name: photos_magazine photos_magazine_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine
    ADD CONSTRAINT photos_magazine_pkey PRIMARY KEY (id);


--
-- Name: photos_magazine photos_magazine_slug_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine
    ADD CONSTRAINT photos_magazine_slug_key UNIQUE (slug);


--
-- Name: photos_magazine_user_likes photos_magazine_user_likes_magazine_id_user_id_e326be66_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine_user_likes
    ADD CONSTRAINT photos_magazine_user_likes_magazine_id_user_id_e326be66_uniq UNIQUE (magazine_id, user_id);


--
-- Name: photos_magazine_user_likes photos_magazine_user_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine_user_likes
    ADD CONSTRAINT photos_magazine_user_likes_pkey PRIMARY KEY (id);


--
-- Name: photos_magazinearchivedfile photos_magazinearchivedfile_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinearchivedfile
    ADD CONSTRAINT photos_magazinearchivedfile_pkey PRIMARY KEY (id);


--
-- Name: photos_magazineattachedphoto photos_magazineattachedphoto_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazineattachedphoto
    ADD CONSTRAINT photos_magazineattachedphoto_pkey PRIMARY KEY (id);


--
-- Name: photos_magazinecategory photos_magazinecategory_order_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinecategory
    ADD CONSTRAINT photos_magazinecategory_order_key UNIQUE ("order");


--
-- Name: photos_magazinecategory photos_magazinecategory_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinecategory
    ADD CONSTRAINT photos_magazinecategory_pkey PRIMARY KEY (cat_id);


--
-- Name: photos_magazinecomment photos_magazinecomment_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinecomment
    ADD CONSTRAINT photos_magazinecomment_pkey PRIMARY KEY (cmt_id);


--
-- Name: photos_magazinefeature photos_magazinefeature_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinefeature
    ADD CONSTRAINT photos_magazinefeature_pkey PRIMARY KEY (id);


--
-- Name: photos_magazinelike photos_magazinelike_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinelike
    ADD CONSTRAINT photos_magazinelike_pkey PRIMARY KEY (like_id);


--
-- Name: photos_magazinesubcategory photos_magazinesubcategory_order_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinesubcategory
    ADD CONSTRAINT photos_magazinesubcategory_order_key UNIQUE ("order");


--
-- Name: photos_magazinesubcategory photos_magazinesubcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinesubcategory
    ADD CONSTRAINT photos_magazinesubcategory_pkey PRIMARY KEY (cat_id);


--
-- Name: photos_photo photos_photo_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photo
    ADD CONSTRAINT photos_photo_pkey PRIMARY KEY (id);


--
-- Name: photos_photo photos_photo_slug_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photo
    ADD CONSTRAINT photos_photo_slug_key UNIQUE (slug);


--
-- Name: photos_photo_user_likes photos_photo_user_likes_photo_id_user_id_9a420ef8_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photo_user_likes
    ADD CONSTRAINT photos_photo_user_likes_photo_id_user_id_9a420ef8_uniq UNIQUE (photo_id, user_id);


--
-- Name: photos_photo_user_likes photos_photo_user_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photo_user_likes
    ADD CONSTRAINT photos_photo_user_likes_pkey PRIMARY KEY (id);


--
-- Name: photos_photocategory photos_photocategory_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photocategory
    ADD CONSTRAINT photos_photocategory_pkey PRIMARY KEY (cat_id);


--
-- Name: photos_photocomment photos_photocomment_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photocomment
    ADD CONSTRAINT photos_photocomment_pkey PRIMARY KEY (cmt_id);


--
-- Name: photos_photofeature photos_photofeature_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photofeature
    ADD CONSTRAINT photos_photofeature_pkey PRIMARY KEY (id);


--
-- Name: photos_photolike photos_photolike_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photolike
    ADD CONSTRAINT photos_photolike_pkey PRIMARY KEY (like_id);


--
-- Name: social_auth_association social_auth_association_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_association
    ADD CONSTRAINT social_auth_association_pkey PRIMARY KEY (id);


--
-- Name: social_auth_association social_auth_association_server_url_handle_078befa2_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_association
    ADD CONSTRAINT social_auth_association_server_url_handle_078befa2_uniq UNIQUE (server_url, handle);


--
-- Name: social_auth_code social_auth_code_email_code_801b2d02_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_code
    ADD CONSTRAINT social_auth_code_email_code_801b2d02_uniq UNIQUE (email, code);


--
-- Name: social_auth_code social_auth_code_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_code
    ADD CONSTRAINT social_auth_code_pkey PRIMARY KEY (id);


--
-- Name: social_auth_nonce social_auth_nonce_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_nonce
    ADD CONSTRAINT social_auth_nonce_pkey PRIMARY KEY (id);


--
-- Name: social_auth_nonce social_auth_nonce_server_url_timestamp_salt_f6284463_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_nonce
    ADD CONSTRAINT social_auth_nonce_server_url_timestamp_salt_f6284463_uniq UNIQUE (server_url, "timestamp", salt);


--
-- Name: social_auth_partial social_auth_partial_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_partial
    ADD CONSTRAINT social_auth_partial_pkey PRIMARY KEY (id);


--
-- Name: social_auth_usersocialauth social_auth_usersocialauth_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_usersocialauth
    ADD CONSTRAINT social_auth_usersocialauth_pkey PRIMARY KEY (id);


--
-- Name: social_auth_usersocialauth social_auth_usersocialauth_provider_uid_e6b5e668_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_usersocialauth
    ADD CONSTRAINT social_auth_usersocialauth_provider_uid_e6b5e668_uniq UNIQUE (provider, uid);


--
-- Name: spirit_cache spirit_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_cache
    ADD CONSTRAINT spirit_cache_pkey PRIMARY KEY (cache_key);


--
-- Name: spirit_category_category spirit_category_category_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_category_category
    ADD CONSTRAINT spirit_category_category_pkey PRIMARY KEY (id);


--
-- Name: spirit_comment_bookmark_commentbookmark spirit_comment_bookmark__user_id_topic_id_5ad0da74_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_bookmark_commentbookmark
    ADD CONSTRAINT spirit_comment_bookmark__user_id_topic_id_5ad0da74_uniq UNIQUE (user_id, topic_id);


--
-- Name: spirit_comment_bookmark_commentbookmark spirit_comment_bookmark_commentbookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_bookmark_commentbookmark
    ADD CONSTRAINT spirit_comment_bookmark_commentbookmark_pkey PRIMARY KEY (id);


--
-- Name: spirit_comment_comment spirit_comment_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_comment
    ADD CONSTRAINT spirit_comment_comment_pkey PRIMARY KEY (id);


--
-- Name: spirit_comment_flag_commentflag spirit_comment_flag_commentflag_comment_id_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_commentflag
    ADD CONSTRAINT spirit_comment_flag_commentflag_comment_id_key UNIQUE (comment_id);


--
-- Name: spirit_comment_flag_commentflag spirit_comment_flag_commentflag_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_commentflag
    ADD CONSTRAINT spirit_comment_flag_commentflag_pkey PRIMARY KEY (id);


--
-- Name: spirit_comment_flag_flag spirit_comment_flag_flag_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_flag
    ADD CONSTRAINT spirit_comment_flag_flag_pkey PRIMARY KEY (id);


--
-- Name: spirit_comment_flag_flag spirit_comment_flag_flag_user_id_comment_id_900c59f8_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_flag
    ADD CONSTRAINT spirit_comment_flag_flag_user_id_comment_id_900c59f8_uniq UNIQUE (user_id, comment_id);


--
-- Name: spirit_comment_history_commenthistory spirit_comment_history_commenthistory_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_history_commenthistory
    ADD CONSTRAINT spirit_comment_history_commenthistory_pkey PRIMARY KEY (id);


--
-- Name: spirit_comment_like_commentlike spirit_comment_like_comm_user_id_comment_id_32b1f85f_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_like_commentlike
    ADD CONSTRAINT spirit_comment_like_comm_user_id_comment_id_32b1f85f_uniq UNIQUE (user_id, comment_id);


--
-- Name: spirit_comment_like_commentlike spirit_comment_like_commentlike_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_like_commentlike
    ADD CONSTRAINT spirit_comment_like_commentlike_pkey PRIMARY KEY (id);


--
-- Name: spirit_comment_poll_commentpollchoice spirit_comment_poll_comm_poll_id_number_36ccebb7_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpollchoice
    ADD CONSTRAINT spirit_comment_poll_comm_poll_id_number_36ccebb7_uniq UNIQUE (poll_id, number);


--
-- Name: spirit_comment_poll_commentpollvote spirit_comment_poll_comm_voter_id_choice_id_b2b15b1f_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpollvote
    ADD CONSTRAINT spirit_comment_poll_comm_voter_id_choice_id_b2b15b1f_uniq UNIQUE (voter_id, choice_id);


--
-- Name: spirit_comment_poll_commentpoll spirit_comment_poll_commentpoll_comment_id_name_b54ee48a_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpoll
    ADD CONSTRAINT spirit_comment_poll_commentpoll_comment_id_name_b54ee48a_uniq UNIQUE (comment_id, name);


--
-- Name: spirit_comment_poll_commentpoll spirit_comment_poll_commentpoll_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpoll
    ADD CONSTRAINT spirit_comment_poll_commentpoll_pkey PRIMARY KEY (id);


--
-- Name: spirit_comment_poll_commentpollchoice spirit_comment_poll_commentpollchoice_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpollchoice
    ADD CONSTRAINT spirit_comment_poll_commentpollchoice_pkey PRIMARY KEY (id);


--
-- Name: spirit_comment_poll_commentpollvote spirit_comment_poll_commentpollvote_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpollvote
    ADD CONSTRAINT spirit_comment_poll_commentpollvote_pkey PRIMARY KEY (id);


--
-- Name: spirit_rl_cache spirit_rl_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_rl_cache
    ADD CONSTRAINT spirit_rl_cache_pkey PRIMARY KEY (cache_key);


--
-- Name: spirit_topic_favorite_topicfavorite spirit_topic_favorite_to_user_id_topic_id_167416f4_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_favorite_topicfavorite
    ADD CONSTRAINT spirit_topic_favorite_to_user_id_topic_id_167416f4_uniq UNIQUE (user_id, topic_id);


--
-- Name: spirit_topic_favorite_topicfavorite spirit_topic_favorite_topicfavorite_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_favorite_topicfavorite
    ADD CONSTRAINT spirit_topic_favorite_topicfavorite_pkey PRIMARY KEY (id);


--
-- Name: spirit_topic_notification_topicnotification spirit_topic_notificatio_user_id_topic_id_1f927541_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_notification_topicnotification
    ADD CONSTRAINT spirit_topic_notificatio_user_id_topic_id_1f927541_uniq UNIQUE (user_id, topic_id);


--
-- Name: spirit_topic_notification_topicnotification spirit_topic_notification_topicnotification_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_notification_topicnotification
    ADD CONSTRAINT spirit_topic_notification_topicnotification_pkey PRIMARY KEY (id);


--
-- Name: spirit_topic_private_topicprivate spirit_topic_private_top_user_id_topic_id_8c297113_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_private_topicprivate
    ADD CONSTRAINT spirit_topic_private_top_user_id_topic_id_8c297113_uniq UNIQUE (user_id, topic_id);


--
-- Name: spirit_topic_private_topicprivate spirit_topic_private_topicprivate_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_private_topicprivate
    ADD CONSTRAINT spirit_topic_private_topicprivate_pkey PRIMARY KEY (id);


--
-- Name: spirit_topic_topic spirit_topic_topic_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_topic
    ADD CONSTRAINT spirit_topic_topic_pkey PRIMARY KEY (id);


--
-- Name: spirit_topic_unread_topicunread spirit_topic_unread_topicunread_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_unread_topicunread
    ADD CONSTRAINT spirit_topic_unread_topicunread_pkey PRIMARY KEY (id);


--
-- Name: spirit_topic_unread_topicunread spirit_topic_unread_topicunread_user_id_topic_id_8f3c8a54_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_unread_topicunread
    ADD CONSTRAINT spirit_topic_unread_topicunread_user_id_topic_id_8f3c8a54_uniq UNIQUE (user_id, topic_id);


--
-- Name: spirit_user_userprofile spirit_user_userprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_user_userprofile
    ADD CONSTRAINT spirit_user_userprofile_pkey PRIMARY KEY (id);


--
-- Name: spirit_user_userprofile spirit_user_userprofile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_user_userprofile
    ADD CONSTRAINT spirit_user_userprofile_user_id_key UNIQUE (user_id);


--
-- Name: taggit_tag taggit_tag_name_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.taggit_tag
    ADD CONSTRAINT taggit_tag_name_key UNIQUE (name);


--
-- Name: taggit_tag taggit_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.taggit_tag
    ADD CONSTRAINT taggit_tag_pkey PRIMARY KEY (id);


--
-- Name: taggit_tag taggit_tag_slug_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.taggit_tag
    ADD CONSTRAINT taggit_tag_slug_key UNIQUE (slug);


--
-- Name: taggit_taggeditem taggit_taggeditem_content_type_id_object_i_4bb97a8e_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_content_type_id_object_i_4bb97a8e_uniq UNIQUE (content_type_id, object_id, tag_id);


--
-- Name: taggit_taggeditem taggit_taggeditem_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_pkey PRIMARY KEY (id);


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blacklistedtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_pkey PRIMARY KEY (id);


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blacklistedtoken_token_id_key; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_token_id_key UNIQUE (token_id);


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq UNIQUE (jti);


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outstandingtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outstandingtoken_pkey PRIMARY KEY (id);


--
-- Name: account_emailaddress_email_03be32b2_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX account_emailaddress_email_03be32b2_like ON public.account_emailaddress USING btree (email varchar_pattern_ops);


--
-- Name: account_emailaddress_user_id_2c513194; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX account_emailaddress_user_id_2c513194 ON public.account_emailaddress USING btree (user_id);


--
-- Name: account_emailconfirmation_email_address_id_5b7f8c58; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX account_emailconfirmation_email_address_id_5b7f8c58 ON public.account_emailconfirmation USING btree (email_address_id);


--
-- Name: account_emailconfirmation_key_f43612bd_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX account_emailconfirmation_key_f43612bd_like ON public.account_emailconfirmation USING btree (key varchar_pattern_ops);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_email_1c89df09_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_user_email_1c89df09_like ON public.auth_user USING btree (email varchar_pattern_ops);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: django_site_domain_a2e37b91_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX django_site_domain_a2e37b91_like ON public.django_site USING btree (domain varchar_pattern_ops);


--
-- Name: djconfig_config_key_9f923a4c_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX djconfig_config_key_9f923a4c_like ON public.djconfig_config USING btree (key varchar_pattern_ops);


--
-- Name: photos_magazine_author_id_c3cdebc2; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazine_author_id_c3cdebc2 ON public.photos_magazine USING btree (author_id);


--
-- Name: photos_magazine_category_id_a1c8e4a4; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazine_category_id_a1c8e4a4 ON public.photos_magazine USING btree (category_id);


--
-- Name: photos_magazine_slug_fb8bf679_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazine_slug_fb8bf679_like ON public.photos_magazine USING btree (slug varchar_pattern_ops);


--
-- Name: photos_magazine_sub_category_id_d924762b; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazine_sub_category_id_d924762b ON public.photos_magazine USING btree (sub_category_id);


--
-- Name: photos_magazine_user_likes_magazine_id_b283a572; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazine_user_likes_magazine_id_b283a572 ON public.photos_magazine_user_likes USING btree (magazine_id);


--
-- Name: photos_magazine_user_likes_user_id_0576e038; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazine_user_likes_user_id_0576e038 ON public.photos_magazine_user_likes USING btree (user_id);


--
-- Name: photos_magazinearchivedfile_magazine_id_52186279; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazinearchivedfile_magazine_id_52186279 ON public.photos_magazinearchivedfile USING btree (magazine_id);


--
-- Name: photos_magazineattachedphoto_magazine_id_250b2c5a; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazineattachedphoto_magazine_id_250b2c5a ON public.photos_magazineattachedphoto USING btree (magazine_id);


--
-- Name: photos_magazinecomment_magazine_id_id_24051cb4; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazinecomment_magazine_id_id_24051cb4 ON public.photos_magazinecomment USING btree (magazine_id_id);


--
-- Name: photos_magazinecomment_parent_id_03e06a33; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazinecomment_parent_id_03e06a33 ON public.photos_magazinecomment USING btree (parent_id);


--
-- Name: photos_magazinecomment_user_id_id_ea1e0cf2; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazinecomment_user_id_id_ea1e0cf2 ON public.photos_magazinecomment USING btree (user_id_id);


--
-- Name: photos_magazinefeature_feature_magazine_id_2ea1b4d8; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazinefeature_feature_magazine_id_2ea1b4d8 ON public.photos_magazinefeature USING btree (feature_magazine_id);


--
-- Name: photos_magazinelike_magazine_id_id_24eff9a2; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazinelike_magazine_id_id_24eff9a2 ON public.photos_magazinelike USING btree (magazine_id_id);


--
-- Name: photos_magazinelike_user_id_id_a7c6d130; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_magazinelike_user_id_id_a7c6d130 ON public.photos_magazinelike USING btree (user_id_id);


--
-- Name: photos_photo_category_id_23a2702a; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photo_category_id_23a2702a ON public.photos_photo USING btree (category_id);


--
-- Name: photos_photo_slug_d951358b_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photo_slug_d951358b_like ON public.photos_photo USING btree (slug varchar_pattern_ops);


--
-- Name: photos_photo_user_likes_photo_id_ed5ee0ce; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photo_user_likes_photo_id_ed5ee0ce ON public.photos_photo_user_likes USING btree (photo_id);


--
-- Name: photos_photo_user_likes_user_id_f4256570; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photo_user_likes_user_id_f4256570 ON public.photos_photo_user_likes USING btree (user_id);


--
-- Name: photos_photocomment_parent_id_71acc1fd; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photocomment_parent_id_71acc1fd ON public.photos_photocomment USING btree (parent_id);


--
-- Name: photos_photocomment_photo_id_id_c4b2af58; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photocomment_photo_id_id_c4b2af58 ON public.photos_photocomment USING btree (photo_id_id);


--
-- Name: photos_photocomment_user_id_id_2cfe9b79; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photocomment_user_id_id_2cfe9b79 ON public.photos_photocomment USING btree (user_id_id);


--
-- Name: photos_photofeature_feature_photo_id_b30f1bcb; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photofeature_feature_photo_id_b30f1bcb ON public.photos_photofeature USING btree (feature_photo_id);


--
-- Name: photos_photofeature_login_photo_id_3bcfc05d; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photofeature_login_photo_id_3bcfc05d ON public.photos_photofeature USING btree (login_photo_id);


--
-- Name: photos_photofeature_popup_photo_id_5e8c15b9; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photofeature_popup_photo_id_5e8c15b9 ON public.photos_photofeature USING btree (popup_photo_id);


--
-- Name: photos_photofeature_signup_photo_id_9a625ff4; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photofeature_signup_photo_id_9a625ff4 ON public.photos_photofeature USING btree (signup_photo_id);


--
-- Name: photos_photofeature_subscribe_photo_id_951cd8d7; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photofeature_subscribe_photo_id_951cd8d7 ON public.photos_photofeature USING btree (subscribe_photo_id);


--
-- Name: photos_photolike_photo_id_id_cacee4df; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photolike_photo_id_id_cacee4df ON public.photos_photolike USING btree (photo_id_id);


--
-- Name: photos_photolike_user_id_id_3239ce88; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX photos_photolike_user_id_id_3239ce88 ON public.photos_photolike USING btree (user_id_id);


--
-- Name: social_auth_code_code_a2393167; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX social_auth_code_code_a2393167 ON public.social_auth_code USING btree (code);


--
-- Name: social_auth_code_code_a2393167_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX social_auth_code_code_a2393167_like ON public.social_auth_code USING btree (code varchar_pattern_ops);


--
-- Name: social_auth_code_timestamp_176b341f; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX social_auth_code_timestamp_176b341f ON public.social_auth_code USING btree ("timestamp");


--
-- Name: social_auth_partial_timestamp_50f2119f; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX social_auth_partial_timestamp_50f2119f ON public.social_auth_partial USING btree ("timestamp");


--
-- Name: social_auth_partial_token_3017fea3; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX social_auth_partial_token_3017fea3 ON public.social_auth_partial USING btree (token);


--
-- Name: social_auth_partial_token_3017fea3_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX social_auth_partial_token_3017fea3_like ON public.social_auth_partial USING btree (token varchar_pattern_ops);


--
-- Name: social_auth_usersocialauth_uid_796e51dc; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX social_auth_usersocialauth_uid_796e51dc ON public.social_auth_usersocialauth USING btree (uid);


--
-- Name: social_auth_usersocialauth_uid_796e51dc_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX social_auth_usersocialauth_uid_796e51dc_like ON public.social_auth_usersocialauth USING btree (uid varchar_pattern_ops);


--
-- Name: social_auth_usersocialauth_user_id_17d28448; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX social_auth_usersocialauth_user_id_17d28448 ON public.social_auth_usersocialauth USING btree (user_id);


--
-- Name: spirit_cache_expires; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_cache_expires ON public.spirit_cache USING btree (expires);


--
-- Name: spirit_category_category_parent_id_e59f3015; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_category_category_parent_id_e59f3015 ON public.spirit_category_category USING btree (parent_id);


--
-- Name: spirit_comment_bookmark_commentbookmark_topic_id_cd606f44; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_bookmark_commentbookmark_topic_id_cd606f44 ON public.spirit_comment_bookmark_commentbookmark USING btree (topic_id);


--
-- Name: spirit_comment_bookmark_commentbookmark_user_id_b31a0d88; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_bookmark_commentbookmark_user_id_b31a0d88 ON public.spirit_comment_bookmark_commentbookmark USING btree (user_id);


--
-- Name: spirit_comment_comment_topic_id_4f5636aa; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_comment_topic_id_4f5636aa ON public.spirit_comment_comment USING btree (topic_id);


--
-- Name: spirit_comment_comment_user_id_0f9dbd41; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_comment_user_id_0f9dbd41 ON public.spirit_comment_comment USING btree (user_id);


--
-- Name: spirit_comment_flag_commentflag_moderator_id_1eb69535; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_flag_commentflag_moderator_id_1eb69535 ON public.spirit_comment_flag_commentflag USING btree (moderator_id);


--
-- Name: spirit_comment_flag_flag_comment_id_1223e22e; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_flag_flag_comment_id_1223e22e ON public.spirit_comment_flag_flag USING btree (comment_id);


--
-- Name: spirit_comment_flag_flag_user_id_ffbf846e; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_flag_flag_user_id_ffbf846e ON public.spirit_comment_flag_flag USING btree (user_id);


--
-- Name: spirit_comment_history_commenthistory_comment_fk_id_48f6b502; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_history_commenthistory_comment_fk_id_48f6b502 ON public.spirit_comment_history_commenthistory USING btree (comment_fk_id);


--
-- Name: spirit_comment_like_commentlike_comment_id_a81f0f4f; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_like_commentlike_comment_id_a81f0f4f ON public.spirit_comment_like_commentlike USING btree (comment_id);


--
-- Name: spirit_comment_like_commentlike_user_id_85e21014; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_like_commentlike_user_id_85e21014 ON public.spirit_comment_like_commentlike USING btree (user_id);


--
-- Name: spirit_comment_poll_commentpoll_comment_id_453c04b5; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_poll_commentpoll_comment_id_453c04b5 ON public.spirit_comment_poll_commentpoll USING btree (comment_id);


--
-- Name: spirit_comment_poll_commentpollchoice_poll_id_01dd8cb4; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_poll_commentpollchoice_poll_id_01dd8cb4 ON public.spirit_comment_poll_commentpollchoice USING btree (poll_id);


--
-- Name: spirit_comment_poll_commentpollvote_choice_id_1ecb02ca; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_poll_commentpollvote_choice_id_1ecb02ca ON public.spirit_comment_poll_commentpollvote USING btree (choice_id);


--
-- Name: spirit_comment_poll_commentpollvote_voter_id_7fd9a8eb; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_comment_poll_commentpollvote_voter_id_7fd9a8eb ON public.spirit_comment_poll_commentpollvote USING btree (voter_id);


--
-- Name: spirit_rl_cache_expires; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_rl_cache_expires ON public.spirit_rl_cache USING btree (expires);


--
-- Name: spirit_topic_favorite_topicfavorite_topic_id_7a363899; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_favorite_topicfavorite_topic_id_7a363899 ON public.spirit_topic_favorite_topicfavorite USING btree (topic_id);


--
-- Name: spirit_topic_favorite_topicfavorite_user_id_e406cc12; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_favorite_topicfavorite_user_id_e406cc12 ON public.spirit_topic_favorite_topicfavorite USING btree (user_id);


--
-- Name: spirit_topic_notification_topicnotification_comment_id_703f40ab; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_notification_topicnotification_comment_id_703f40ab ON public.spirit_topic_notification_topicnotification USING btree (comment_id);


--
-- Name: spirit_topic_notification_topicnotification_topic_id_449cdcfe; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_notification_topicnotification_topic_id_449cdcfe ON public.spirit_topic_notification_topicnotification USING btree (topic_id);


--
-- Name: spirit_topic_notification_topicnotification_user_id_a9d2003a; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_notification_topicnotification_user_id_a9d2003a ON public.spirit_topic_notification_topicnotification USING btree (user_id);


--
-- Name: spirit_topic_private_topicprivate_topic_id_47c6f3fd; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_private_topicprivate_topic_id_47c6f3fd ON public.spirit_topic_private_topicprivate USING btree (topic_id);


--
-- Name: spirit_topic_private_topicprivate_user_id_682c6ef5; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_private_topicprivate_user_id_682c6ef5 ON public.spirit_topic_private_topicprivate USING btree (user_id);


--
-- Name: spirit_topic_topic_category_id_824dc7e8; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_topic_category_id_824dc7e8 ON public.spirit_topic_topic USING btree (category_id);


--
-- Name: spirit_topic_topic_user_id_5d0151a9; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_topic_user_id_5d0151a9 ON public.spirit_topic_topic USING btree (user_id);


--
-- Name: spirit_topic_unread_topicunread_topic_id_04fc7131; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_unread_topicunread_topic_id_04fc7131 ON public.spirit_topic_unread_topicunread USING btree (topic_id);


--
-- Name: spirit_topic_unread_topicunread_user_id_f5a459f5; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX spirit_topic_unread_topicunread_user_id_f5a459f5 ON public.spirit_topic_unread_topicunread USING btree (user_id);


--
-- Name: taggit_tag_name_58eb2ed9_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX taggit_tag_name_58eb2ed9_like ON public.taggit_tag USING btree (name varchar_pattern_ops);


--
-- Name: taggit_tag_slug_6be58b2c_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX taggit_tag_slug_6be58b2c_like ON public.taggit_tag USING btree (slug varchar_pattern_ops);


--
-- Name: taggit_taggeditem_content_type_id_9957a03c; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX taggit_taggeditem_content_type_id_9957a03c ON public.taggit_taggeditem USING btree (content_type_id);


--
-- Name: taggit_taggeditem_content_type_id_object_id_196cc965_idx; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX taggit_taggeditem_content_type_id_object_id_196cc965_idx ON public.taggit_taggeditem USING btree (content_type_id, object_id);


--
-- Name: taggit_taggeditem_object_id_e2d7d1df; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX taggit_taggeditem_object_id_e2d7d1df ON public.taggit_taggeditem USING btree (object_id);


--
-- Name: taggit_taggeditem_tag_id_f4f5b767; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX taggit_taggeditem_tag_id_f4f5b767 ON public.taggit_taggeditem USING btree (tag_id);


--
-- Name: token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_like; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_like ON public.token_blacklist_outstandingtoken USING btree (jti varchar_pattern_ops);


--
-- Name: token_blacklist_outstandingtoken_user_id_83bc629a; Type: INDEX; Schema: public; Owner: fashion_info
--

CREATE INDEX token_blacklist_outstandingtoken_user_id_83bc629a ON public.token_blacklist_outstandingtoken USING btree (user_id);


--
-- Name: account_emailaddress account_emailaddress_user_id_2c513194_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_user_id_2c513194_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_emailconfirmation account_emailconfirm_email_address_id_5b7f8c58_fk_account_e; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirm_email_address_id_5b7f8c58_fk_account_e FOREIGN KEY (email_address_id) REFERENCES public.account_emailaddress(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_userprofile accounts_userprofile_user_id_92240672_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_user_id_92240672_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazine photos_magazine_author_id_c3cdebc2_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine
    ADD CONSTRAINT photos_magazine_author_id_c3cdebc2_fk_auth_user_id FOREIGN KEY (author_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazine photos_magazine_category_id_a1c8e4a4_fk_photos_ma; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine
    ADD CONSTRAINT photos_magazine_category_id_a1c8e4a4_fk_photos_ma FOREIGN KEY (category_id) REFERENCES public.photos_magazinecategory(cat_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazine photos_magazine_sub_category_id_d924762b_fk_photos_ma; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine
    ADD CONSTRAINT photos_magazine_sub_category_id_d924762b_fk_photos_ma FOREIGN KEY (sub_category_id) REFERENCES public.photos_magazinesubcategory(cat_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazine_user_likes photos_magazine_user_likes_user_id_0576e038_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine_user_likes
    ADD CONSTRAINT photos_magazine_user_likes_user_id_0576e038_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazine_user_likes photos_magazine_user_magazine_id_b283a572_fk_photos_ma; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazine_user_likes
    ADD CONSTRAINT photos_magazine_user_magazine_id_b283a572_fk_photos_ma FOREIGN KEY (magazine_id) REFERENCES public.photos_magazine(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazinearchivedfile photos_magazinearchi_magazine_id_52186279_fk_photos_ma; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinearchivedfile
    ADD CONSTRAINT photos_magazinearchi_magazine_id_52186279_fk_photos_ma FOREIGN KEY (magazine_id) REFERENCES public.photos_magazine(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazineattachedphoto photos_magazineattac_magazine_id_250b2c5a_fk_photos_ma; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazineattachedphoto
    ADD CONSTRAINT photos_magazineattac_magazine_id_250b2c5a_fk_photos_ma FOREIGN KEY (magazine_id) REFERENCES public.photos_magazine(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazinecomment photos_magazinecomme_magazine_id_id_24051cb4_fk_photos_ma; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinecomment
    ADD CONSTRAINT photos_magazinecomme_magazine_id_id_24051cb4_fk_photos_ma FOREIGN KEY (magazine_id_id) REFERENCES public.photos_magazine(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazinecomment photos_magazinecomme_parent_id_03e06a33_fk_photos_ma; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinecomment
    ADD CONSTRAINT photos_magazinecomme_parent_id_03e06a33_fk_photos_ma FOREIGN KEY (parent_id) REFERENCES public.photos_magazinecomment(cmt_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazinecomment photos_magazinecomment_user_id_id_ea1e0cf2_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinecomment
    ADD CONSTRAINT photos_magazinecomment_user_id_id_ea1e0cf2_fk_auth_user_id FOREIGN KEY (user_id_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazinefeature photos_magazinefeatu_feature_magazine_id_2ea1b4d8_fk_photos_ma; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinefeature
    ADD CONSTRAINT photos_magazinefeatu_feature_magazine_id_2ea1b4d8_fk_photos_ma FOREIGN KEY (feature_magazine_id) REFERENCES public.photos_magazine(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazinelike photos_magazinelike_magazine_id_id_24eff9a2_fk_photos_ma; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinelike
    ADD CONSTRAINT photos_magazinelike_magazine_id_id_24eff9a2_fk_photos_ma FOREIGN KEY (magazine_id_id) REFERENCES public.photos_magazine(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_magazinelike photos_magazinelike_user_id_id_a7c6d130_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_magazinelike
    ADD CONSTRAINT photos_magazinelike_user_id_id_a7c6d130_fk_auth_user_id FOREIGN KEY (user_id_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photo photos_photo_category_id_23a2702a_fk_photos_ph; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photo
    ADD CONSTRAINT photos_photo_category_id_23a2702a_fk_photos_ph FOREIGN KEY (category_id) REFERENCES public.photos_photocategory(cat_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photo_user_likes photos_photo_user_likes_photo_id_ed5ee0ce_fk_photos_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photo_user_likes
    ADD CONSTRAINT photos_photo_user_likes_photo_id_ed5ee0ce_fk_photos_photo_id FOREIGN KEY (photo_id) REFERENCES public.photos_photo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photo_user_likes photos_photo_user_likes_user_id_f4256570_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photo_user_likes
    ADD CONSTRAINT photos_photo_user_likes_user_id_f4256570_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photocomment photos_photocomment_parent_id_71acc1fd_fk_photos_ph; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photocomment
    ADD CONSTRAINT photos_photocomment_parent_id_71acc1fd_fk_photos_ph FOREIGN KEY (parent_id) REFERENCES public.photos_photocomment(cmt_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photocomment photos_photocomment_photo_id_id_c4b2af58_fk_photos_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photocomment
    ADD CONSTRAINT photos_photocomment_photo_id_id_c4b2af58_fk_photos_photo_id FOREIGN KEY (photo_id_id) REFERENCES public.photos_photo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photocomment photos_photocomment_user_id_id_2cfe9b79_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photocomment
    ADD CONSTRAINT photos_photocomment_user_id_id_2cfe9b79_fk_auth_user_id FOREIGN KEY (user_id_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photofeature photos_photofeature_feature_photo_id_b30f1bcb_fk_photos_ph; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photofeature
    ADD CONSTRAINT photos_photofeature_feature_photo_id_b30f1bcb_fk_photos_ph FOREIGN KEY (feature_photo_id) REFERENCES public.photos_photo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photofeature photos_photofeature_login_photo_id_3bcfc05d_fk_photos_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photofeature
    ADD CONSTRAINT photos_photofeature_login_photo_id_3bcfc05d_fk_photos_photo_id FOREIGN KEY (login_photo_id) REFERENCES public.photos_photo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photofeature photos_photofeature_popup_photo_id_5e8c15b9_fk_photos_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photofeature
    ADD CONSTRAINT photos_photofeature_popup_photo_id_5e8c15b9_fk_photos_photo_id FOREIGN KEY (popup_photo_id) REFERENCES public.photos_photo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photofeature photos_photofeature_signup_photo_id_9a625ff4_fk_photos_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photofeature
    ADD CONSTRAINT photos_photofeature_signup_photo_id_9a625ff4_fk_photos_photo_id FOREIGN KEY (signup_photo_id) REFERENCES public.photos_photo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photofeature photos_photofeature_subscribe_photo_id_951cd8d7_fk_photos_ph; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photofeature
    ADD CONSTRAINT photos_photofeature_subscribe_photo_id_951cd8d7_fk_photos_ph FOREIGN KEY (subscribe_photo_id) REFERENCES public.photos_photo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photolike photos_photolike_photo_id_id_cacee4df_fk_photos_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photolike
    ADD CONSTRAINT photos_photolike_photo_id_id_cacee4df_fk_photos_photo_id FOREIGN KEY (photo_id_id) REFERENCES public.photos_photo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: photos_photolike photos_photolike_user_id_id_3239ce88_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.photos_photolike
    ADD CONSTRAINT photos_photolike_user_id_id_3239ce88_fk_auth_user_id FOREIGN KEY (user_id_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: social_auth_usersocialauth social_auth_usersocialauth_user_id_17d28448_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.social_auth_usersocialauth
    ADD CONSTRAINT social_auth_usersocialauth_user_id_17d28448_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_category_category spirit_category_cate_parent_id_e59f3015_fk_spirit_ca; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_category_category
    ADD CONSTRAINT spirit_category_cate_parent_id_e59f3015_fk_spirit_ca FOREIGN KEY (parent_id) REFERENCES public.spirit_category_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_bookmark_commentbookmark spirit_comment_bookm_topic_id_cd606f44_fk_spirit_to; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_bookmark_commentbookmark
    ADD CONSTRAINT spirit_comment_bookm_topic_id_cd606f44_fk_spirit_to FOREIGN KEY (topic_id) REFERENCES public.spirit_topic_topic(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_bookmark_commentbookmark spirit_comment_bookm_user_id_b31a0d88_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_bookmark_commentbookmark
    ADD CONSTRAINT spirit_comment_bookm_user_id_b31a0d88_fk_auth_user FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_comment spirit_comment_comme_topic_id_4f5636aa_fk_spirit_to; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_comment
    ADD CONSTRAINT spirit_comment_comme_topic_id_4f5636aa_fk_spirit_to FOREIGN KEY (topic_id) REFERENCES public.spirit_topic_topic(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_comment spirit_comment_comment_user_id_0f9dbd41_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_comment
    ADD CONSTRAINT spirit_comment_comment_user_id_0f9dbd41_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_flag_flag spirit_comment_flag__comment_id_1223e22e_fk_spirit_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_flag
    ADD CONSTRAINT spirit_comment_flag__comment_id_1223e22e_fk_spirit_co FOREIGN KEY (comment_id) REFERENCES public.spirit_comment_comment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_flag_commentflag spirit_comment_flag__comment_id_95a65492_fk_spirit_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_commentflag
    ADD CONSTRAINT spirit_comment_flag__comment_id_95a65492_fk_spirit_co FOREIGN KEY (comment_id) REFERENCES public.spirit_comment_comment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_flag_commentflag spirit_comment_flag__moderator_id_1eb69535_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_commentflag
    ADD CONSTRAINT spirit_comment_flag__moderator_id_1eb69535_fk_auth_user FOREIGN KEY (moderator_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_flag_flag spirit_comment_flag_flag_user_id_ffbf846e_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_flag_flag
    ADD CONSTRAINT spirit_comment_flag_flag_user_id_ffbf846e_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_history_commenthistory spirit_comment_histo_comment_fk_id_48f6b502_fk_spirit_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_history_commenthistory
    ADD CONSTRAINT spirit_comment_histo_comment_fk_id_48f6b502_fk_spirit_co FOREIGN KEY (comment_fk_id) REFERENCES public.spirit_comment_comment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_like_commentlike spirit_comment_like__comment_id_a81f0f4f_fk_spirit_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_like_commentlike
    ADD CONSTRAINT spirit_comment_like__comment_id_a81f0f4f_fk_spirit_co FOREIGN KEY (comment_id) REFERENCES public.spirit_comment_comment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_like_commentlike spirit_comment_like__user_id_85e21014_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_like_commentlike
    ADD CONSTRAINT spirit_comment_like__user_id_85e21014_fk_auth_user FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_poll_commentpollvote spirit_comment_poll__choice_id_1ecb02ca_fk_spirit_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpollvote
    ADD CONSTRAINT spirit_comment_poll__choice_id_1ecb02ca_fk_spirit_co FOREIGN KEY (choice_id) REFERENCES public.spirit_comment_poll_commentpollchoice(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_poll_commentpoll spirit_comment_poll__comment_id_453c04b5_fk_spirit_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpoll
    ADD CONSTRAINT spirit_comment_poll__comment_id_453c04b5_fk_spirit_co FOREIGN KEY (comment_id) REFERENCES public.spirit_comment_comment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_poll_commentpollchoice spirit_comment_poll__poll_id_01dd8cb4_fk_spirit_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpollchoice
    ADD CONSTRAINT spirit_comment_poll__poll_id_01dd8cb4_fk_spirit_co FOREIGN KEY (poll_id) REFERENCES public.spirit_comment_poll_commentpoll(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_comment_poll_commentpollvote spirit_comment_poll__voter_id_7fd9a8eb_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_comment_poll_commentpollvote
    ADD CONSTRAINT spirit_comment_poll__voter_id_7fd9a8eb_fk_auth_user FOREIGN KEY (voter_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_favorite_topicfavorite spirit_topic_favorit_topic_id_7a363899_fk_spirit_to; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_favorite_topicfavorite
    ADD CONSTRAINT spirit_topic_favorit_topic_id_7a363899_fk_spirit_to FOREIGN KEY (topic_id) REFERENCES public.spirit_topic_topic(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_favorite_topicfavorite spirit_topic_favorit_user_id_e406cc12_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_favorite_topicfavorite
    ADD CONSTRAINT spirit_topic_favorit_user_id_e406cc12_fk_auth_user FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_notification_topicnotification spirit_topic_notific_comment_id_703f40ab_fk_spirit_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_notification_topicnotification
    ADD CONSTRAINT spirit_topic_notific_comment_id_703f40ab_fk_spirit_co FOREIGN KEY (comment_id) REFERENCES public.spirit_comment_comment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_notification_topicnotification spirit_topic_notific_topic_id_449cdcfe_fk_spirit_to; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_notification_topicnotification
    ADD CONSTRAINT spirit_topic_notific_topic_id_449cdcfe_fk_spirit_to FOREIGN KEY (topic_id) REFERENCES public.spirit_topic_topic(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_notification_topicnotification spirit_topic_notific_user_id_a9d2003a_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_notification_topicnotification
    ADD CONSTRAINT spirit_topic_notific_user_id_a9d2003a_fk_auth_user FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_private_topicprivate spirit_topic_private_topic_id_47c6f3fd_fk_spirit_to; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_private_topicprivate
    ADD CONSTRAINT spirit_topic_private_topic_id_47c6f3fd_fk_spirit_to FOREIGN KEY (topic_id) REFERENCES public.spirit_topic_topic(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_private_topicprivate spirit_topic_private_user_id_682c6ef5_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_private_topicprivate
    ADD CONSTRAINT spirit_topic_private_user_id_682c6ef5_fk_auth_user FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_topic spirit_topic_topic_category_id_824dc7e8_fk_spirit_ca; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_topic
    ADD CONSTRAINT spirit_topic_topic_category_id_824dc7e8_fk_spirit_ca FOREIGN KEY (category_id) REFERENCES public.spirit_category_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_topic spirit_topic_topic_user_id_5d0151a9_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_topic
    ADD CONSTRAINT spirit_topic_topic_user_id_5d0151a9_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_unread_topicunread spirit_topic_unread__topic_id_04fc7131_fk_spirit_to; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_unread_topicunread
    ADD CONSTRAINT spirit_topic_unread__topic_id_04fc7131_fk_spirit_to FOREIGN KEY (topic_id) REFERENCES public.spirit_topic_topic(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_topic_unread_topicunread spirit_topic_unread__user_id_f5a459f5_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_topic_unread_topicunread
    ADD CONSTRAINT spirit_topic_unread__user_id_f5a459f5_fk_auth_user FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: spirit_user_userprofile spirit_user_userprofile_user_id_40907b15_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.spirit_user_userprofile
    ADD CONSTRAINT spirit_user_userprofile_user_id_40907b15_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: taggit_taggeditem taggit_taggeditem_content_type_id_9957a03c_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_content_type_id_9957a03c_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: taggit_taggeditem taggit_taggeditem_tag_id_f4f5b767_fk_taggit_tag_id; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_tag_id_f4f5b767_fk_taggit_tag_id FOREIGN KEY (tag_id) REFERENCES public.taggit_tag(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blac_token_id_3cc7fe56_fk_token_bla; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blac_token_id_3cc7fe56_fk_token_bla FOREIGN KEY (token_id) REFERENCES public.token_blacklist_outstandingtoken(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outs_user_id_83bc629a_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: fashion_info
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outs_user_id_83bc629a_fk_auth_user FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: fashion_info
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO fashion_info;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: fashion_info
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

