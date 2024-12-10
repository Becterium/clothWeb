<template>

    <div id="page-wrapper">
        <!-- Header -->
        <header id="header">
            <h1 id="logo"><a href="#">LOGOBAKERY</a></h1>
            <nav id="nav">
                <ul>
                    <li><a href="./home">首页</a></li>
                    <li><a href="./login" class="button special" onclick="a('./login')">登录</a></li>
                </ul>
            </nav>
        </header>
    </div>

    <!-- Banner -->
    <section id="banner">
        <div class="content">
            <span class="image">
                <div class="img-content">
                    <img src="../assets/img/hehe.jpg" alt="派小星资源" />
                </div>
            </span>
            <header>
                <h2 :style="{ color: 'white' }">服装店管理系统</h2>
                <p >“穿出时尚，绽放自我”
                    <br>—— 您的专属服装店管理专家
                </p>
            </header>
        </div>
    </section>


    <!-- Footer -->
    <footer id="footer">
        <ul class="copyright">
            <li>&copy; 2000-2023 Blue dot net All Rights Reserved</li>
            <li>Design: <a>LOGOBAKERY</a></li>
            <div
                style="text-decoration:none; height:20px; margin-top: 20px; line-height:20px; text-align:center;display:flex;justify-content: center;">
                <p style="height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">沪ICP备000000号-
                </p>
            </div>
        </ul>
    </footer>



</template>

<script lang="ts">
export default {
    name: 'home'
}
</script>

<script lang="ts" setup>

</script>

<style scoped>
/* Image */

.image {
    display: inline-block;
    position: relative;
    overflow: hidden;
    background: rgba(39, 40, 51, 0.965);
}

.image:before {
    content: '';
    position: absolute;
    inset: -10px 104px;
    background: linear-gradient(315deg, #e44c65, #62cb44);
    transition: 0.6s;
    animation: animate 3s linear infinite;
}

.image:hover:before {
    inset: -20px 0;
}

@keyframes animate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.image:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    z-index: 1;
}

.img-content {
    position: absolute;
    border-radius: 50%;
    inset: 9px;
    z-index: 3;
    overflow: hidden;
    border: 4px solid rgba(23, 24, 32, 0.65);
}

/* Button */

input[type="submit"],
input[type="reset"],
input[type="button"],
.button {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    appearance: none;
    -moz-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    background-color: transparent;
    border-radius: 4px;
    border: 0;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
    color: #ffffff !important;
    cursor: pointer;
    display: inline-block;
    font-weight: 300;
    height: 3em;
    line-height: 3em;
    padding: 0 2.25em;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
}

input[type="submit"]:hover,
input[type="submit"]:active,
input[type="reset"]:hover,
input[type="reset"]:active,
input[type="button"]:hover,
input[type="button"]:active,
.button:hover,
.button:active {
    box-shadow: inset 0 0 0 1px #e44c65;
    color: #e44c65 !important;
}

input[type="submit"]:active,
input[type="reset"]:active,
input[type="button"]:active,
.button:active {
    background-color: rgba(228, 76, 101, 0.15);
}

input[type="submit"].icon:before,
input[type="reset"].icon:before,
input[type="button"].icon:before,
.button.icon:before {
    margin-right: 0.5em;
}

input[type="submit"].fit,
input[type="reset"].fit,
input[type="button"].fit,
.button.fit {
    display: block;
    margin: 0 0 1em 0;
    width: 100%;
}

input[type="submit"].small,
input[type="reset"].small,
input[type="button"].small,
.button.small {
    font-size: 0.8em;
}

input[type="submit"].big,
input[type="reset"].big,
input[type="button"].big,
.button.big {
    font-size: 1.35em;
}

input[type="submit"].special,
input[type="reset"].special,
input[type="button"].special,
.button.special {
    background-color: #e44c65;
    box-shadow: none;
    color: #ffffff !important;
}

input[type="submit"].special:hover,
input[type="reset"].special:hover,
input[type="button"].special:hover,
.button.special:hover {
    background-color: #e76278;
}

input[type="submit"].special:active,
input[type="reset"].special:active,
input[type="button"].special:active,
.button.special:active {
    background-color: #e13652;
}

input[type="submit"].disabled,
input[type="submit"]:disabled,
input[type="reset"].disabled,
input[type="reset"]:disabled,
input[type="button"].disabled,
input[type="button"]:disabled,
.button.disabled,
.button:disabled {
    background-color: rgba(255, 255, 255, 0.3) !important;
    box-shadow: none !important;
    color: #ffffff !important;
    cursor: default;
    opacity: 0.25;
}

/* Header */

#page-wrapper {
    padding-top: 3.5em;
}

#header {
    background: rgba(39, 40, 51, 0.965);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    font-family: '微软雅黑', 'Open Sans', 'Microsoft YaHei', sans-serif !important;
    letter-spacing: 1px;
    color: #ffffff;
    cursor: default;
    height: 3.8em;
    left: 0;
    line-height: 3.8em;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
}

#header h1 {
    height: inherit;
    left: 4.25em;
    line-height: inherit;
    margin: 0;
    position: absolute;
    top: 0;
}

#header nav {
    position: absolute;
    right: 4.25em;
    top: 0;
}

#header nav ul {
    margin: 0;
}

#header nav ul li {
    display: inline-block;
    margin-left: 1em;
}

#header nav ul li a,
#header nav ul li span {
    border: 0;
    color: inherit;
    display: inline-block;
    height: inherit;
    line-height: inherit;
    outline: 0;
}

#header nav ul li a.button,
#header nav ul li span.button {
    height: 2em;
    line-height: 2em;
    padding: 0 1.25em;
}

#header nav ul li a:not(.button):before,
#header nav ul li span:not(.button):before {
    margin-right: 0.5em;
}

#header nav ul li.active>a,
#header nav ul li.active>span {
    color: #e44c65;
}

#header nav ul li>ul {
    display: none;
}

textarea {
    color: rgba(255, 255, 255, 0.75);
    font-family: "Roboto", Helvetica, sans-serif;
    font-size: 15pt;
    font-weight: 100;
    line-height: 1.75em;
}

a {
    -moz-transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;
    -webkit-transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;
    -ms-transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;
    transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;
    border-bottom: dotted 1px;
    color: #e44c65;
    text-decoration: none;
}

a:hover {
    color: #e44c65 !important;
    border-bottom-color: transparent;
}

/* Banner */

#banner {
    background-attachment: fixed;
    background-color: #272833;
    background-image: url("../assets/img/back.jpg");
    background-position: center center;
    background-size: cover;
    box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.25);
    min-height: 100vh;
    position: relative;
    text-align: center;
    z-index: 21;
}

#banner:before {
    content: '';
    display: inline-block;
    height: 100vh;
    vertical-align: middle;
    width: 1%;
}

#banner:after {
    background-image: -moz-linear-gradient(top, rgba(23, 24, 32, 0.95), rgba(23, 24, 32, 0.95));
    background-image: -webkit-linear-gradient(top, rgba(23, 24, 32, 0.75), rgba(23, 24, 32, 0.65));
    background-image: -ms-linear-gradient(top, rgba(23, 24, 32, 0.95), rgba(23, 24, 32, 0.95));
    background-image: linear-gradient(top, rgba(23, 24, 32, 0.95), rgba(23, 24, 32, 0.95));
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
}

#banner .content {
    display: inline-block;
    max-width: 95%;
    padding: 6em;
    position: relative;
    text-align: left;
    vertical-align: middle;
    z-index: 1;
}

#banner .content header {
    display: inline-block;
    vertical-align: middle;
}

#banner .content header h2 {
    font-size: 2.5em;
    margin: 0;
}

#banner .content header p {
    margin: 0.5em 0 0 0;
    top: 0;
}

#banner .content .image {
    border-radius: 100%;
    display: inline-block;
    height: 18em;
    margin-right: 3em;
    vertical-align: middle;
    width: 18em;
}

#banner .content .image img {
    border-radius: 100%;
    display: block;
    width: 100%;
}

body.is-touch #banner {
    background-attachment: scroll;
}

/* Footer */

#footer {
    background: #272833;
    padding: 6em 0;
    text-align: center;
}

#footer .icons .icon.alt {
    text-decoration: none;
}

#footer .icons .icon.alt:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
}

#footer .icons .icon.alt:before {
    color: #272833 !important;
    text-shadow: 1px 0 0 rgba(255, 255, 255, 0.5), -1px 0 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.5), 0 -1px 0 rgba(255, 255, 255, 0.5);
}

#footer .copyright {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8em;
    line-height: 1em;
    margin: 2em 0 0 0;
    padding: 0;
    text-align: center;
}

#footer .copyright li {
    border-left: solid 1px rgba(255, 255, 255, 0.3);
    display: inline-block;
    list-style: none;
    margin-left: 1.5em;
    padding-left: 1.5em;
}

#footer .copyright li:first-child {
    border-left: 0;
    margin-left: 0;
    padding-left: 0;
}

#footer .copyright li a {
    color: inherit;
}
</style>