---
title: We are hiring
type: Blog
---
<table>
<tr>
<td  >
 {{% blog_img "logo" "hiring_nerd.png" %}}
</td>
<td>
    <div class="shell-wrap">
      <p class="shell-top-bar">&bull;&bull;&bull;</p>
      <ul class="shell-body">
        <li><span class="shell-command">kubectl</span> describe jobs gardener<span class="shell-comment">&crarr;</span></li>
        <li class="shell-comment"># if you want to join the next generation cloud native </li>
        <li class="shell-comment"># movement and bring relevant experience in Linux, container</li>
        <li class="shell-comment"># technologies or networking, we look forward to meeting you.</li>
        <li>&nbsp; </li>
        <li><span class="shell-command">kubectl</span> <a href="mailto:martin.kreyscher@sap.com?subject=Kubernetes Jobs in Gardener Dev or Enablement Team"> contact us</a> <span class="blink shell-comment">&Iota;</span></li>
      </ul>
      <br>
    </div>
</td>
</tr>  
</table>


<style>

.blink {
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
}
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink-animation {
  to {
    visibility: hidden;
  }
}

.shell-wrap {
  width: 700px;
  box-shadow: 0 0 30px rgba(0,0,0,0.4);

  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background:#333;
}

.shell-top-bar {
    text-align: left;
    color: black;
    padding: 5px 0;
    margin: 0;
    font-size: 4em;
    background: transparent;
    line-height: 0.6em;
    padding: 0px;
    padding-left: 8px;
}

.shell-body {
  margin: 0;
  padding: 5px;
  list-style: none;
  color: #0CA391;
  font: 0.8em 'Andale Mono', Consolas, 'Courier New';
  line-height: 1.6em;
  font-size:1em;
}

.shell-command {
 color : #E45C3A;
}

.shell-comment {
 color: gray;
}

.shell-body li:before {
  content: '$';
  position: absolute;
  left: 0;
  top: 0;
  color:white;
}

.shell-body li {
  word-wrap: break-word;
  position: relative;
  padding: 0 0 0 15px;
  margin-bottom:0px;
}
</style>