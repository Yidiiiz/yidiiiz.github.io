# from pyscript import display
# from js import document
# from pyodide.ffi import create_proxy

# import requests
# import json

# def on_submit(event):
#     event.preventDefault()  # prevent page reload
#     # display(event.key, target="output")

#     question = document.getElementById("textInput").value
#     # document.getElementById("output").innerText = f"You entered: {value}"
#     if question == "":
#         return
    
#     url = "https://openrouter.ai/api/v1/chat/completions"
#     headers = {
#         "Authorization": f"Bearer sk-or-v1-",
#         "Content-Type": "application/json"
#     }
#     payload = {
#         "model": "minimax/minimax-m2:free",
#         "messages": [{"role": "user", "content": question}],
#         "stream": True
#     }

#     buffer = ""
#     with requests.post(url, headers=headers, json=payload, stream=True) as r:
#         for chunk in r.iter_content(chunk_size=1024, decode_unicode=True):
#             buffer += chunk
#             while True:
#                 try:
#                     # Find the next complete SSE line
#                     line_end = buffer.find('\n')
#                     if line_end == -1:
#                         break

#                     line = buffer[:line_end].strip()
#                     buffer = buffer[line_end + 1:]

#                     if line.startswith('data: '):
#                         data = line[6:]
#                         if data == '[DONE]':
#                             break

#                         try:
#                             data_obj = json.loads(data)
#                             content = data_obj["choices"][0]["delta"].get("content")
#                             if content:
#                                 display(content, target="output")
#                                 #   print(content, end="", flush=True)
#                         except json.JSONDecodeError:
#                             pass
#                 except Exception:
#                     break

# on_submit_proxy = create_proxy(on_submit)

# document.getElementById("inputForm").addEventListener("submit", on_submit_proxy)
