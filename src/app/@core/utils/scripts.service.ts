import { Injectable } from '@angular/core';

@Injectable()
export class ScriptsService {
  current: number;
  scripts: any =
    {
    'aes_keyt': `Java.perform(function () {
    var use_single_byte = false;
    var complete_bytes = new Array();
    var index = 0;
    var secretKeySpecDef = Java.use('javax.crypto.spec.SecretKeySpec');
    var ivParameterSpecDef = Java.use('javax.crypto.spec.IvParameterSpec');
    var cipherDef = Java.use('javax.crypto.Cipher');
    var cipherDoFinal_1 = cipherDef.doFinal.overload();
    var cipherDoFinal_2 = cipherDef.doFinal.overload('[B');
    var cipherDoFinal_3 = cipherDef.doFinal.overload('[B', 'int');
    var cipherDoFinal_4 = cipherDef.doFinal.overload('[B', 'int', 'int');
    var cipherDoFinal_5 = cipherDef.doFinal.overload('[B', 'int', 'int', '[B');
    var cipherDoFinal_6 = cipherDef.doFinal.overload('[B', 'int', 'int', '[B', 'int');
    var cipherUpdate_1 = cipherDef.update.overload('[B');
    var cipherUpdate_2 = cipherDef.update.overload('[B', 'int', 'int');
    var cipherUpdate_3 = cipherDef.update.overload('[B', 'int', 'int', '[B');
    var cipherUpdate_4 = cipherDef.update.overload('[B', 'int', 'int', '[B', 'int');
    var secretKeySpecDef_init_1 = secretKeySpecDef.$init.overload('[B', 'java.lang.String');
    var secretKeySpecDef_init_2 = secretKeySpecDef.$init.overload('[B', 'int', 'int', 'java.lang.String');
    var ivParameterSpecDef_init_1 = ivParameterSpecDef.$init.overload('[B');
    var ivParameterSpecDef_init_2 = ivParameterSpecDef.$init.overload('[B', 'int', 'int');
    secretKeySpecDef_init_1.implementation = function (arr, alg) {
        var key = b2s(arr);
        send("Creating " + alg + " secret key, plaintext:\\n" + hexdump(key));
        return secretKeySpecDef_init_1.call(this, arr, alg);
    }

    secretKeySpecDef_init_2.implementation = function (arr, off, len, alg) {
        var key = b2s(arr);
        send("Creating " + alg + " secret key, plaintext:\\n" + hexdump(key));
        return secretKeySpecDef_init_2.call(this, arr, off, len, alg);
    }

    /*ivParameterSpecDef_init_1.implementation = function(arr)
    {
        var iv = b2s(arr);
        send("Creating IV:\\n" + hexdump(iv));
        return ivParameterSpecDef_init_1.call(this, arr);
    }
    ivParameterSpecDef_init_2.implementation = function(arr, off, len)
    {
        var iv = b2s(arr);
        send("Creating IV, plaintext:\\n" + hexdump(iv));
        return ivParameterSpecDef_init_2.call(this, arr, off, len);
    }*/

    cipherDoFinal_1.implementation = function () {
        var ret = cipherDoFinal_1.call(this);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_2.implementation = function (arr) {
        addtoarray(arr);
        var ret = cipherDoFinal_2.call(this, arr);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_3.implementation = function (arr, a) {
        addtoarray(arr);
        var ret = cipherDoFinal_3.call(this, arr, a);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_4.implementation = function (arr, a, b) {
        addtoarray(arr);
        var ret = cipherDoFinal_4.call(this, arr, a, b);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_5.implementation = function (arr, a, b, c) {
        addtoarray(arr);
        var ret = cipherDoFinal_5.call(this, arr, a, b, c);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_6.implementation = function (arr, a, b, c, d) {
        addtoarray(arr);
        var ret = cipherDoFinal_6.call(this, arr, a, b, c, d);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, c);
        return ret;
    }

    cipherUpdate_1.implementation = function (arr) {
        addtoarray(arr);
        return cipherUpdate_1.call(this, arr);
    }

    cipherUpdate_2.implementation = function (arr, a, b) {
        addtoarray(arr);
        return cipherUpdate_2.call(this, arr, a, b);
    }

    cipherUpdate_3.implementation = function (arr, a, b, c) {
        addtoarray(arr);
        return cipherUpdate_3.call(this, arr, a, b, c);
    }

    cipherUpdate_4.implementation = function (arr, a, b, c, d) {
        addtoarray(arr);
        return cipherUpdate_4.call(this, arr, a, b, c, d);
    }

    function info(iv, alg, plain, encoded) {
        send("Performing encryption/decryption");
        if (iv) {
            send("Initialization Vector: \\n" + hexdump(b2s(iv)));
        } else {
            send("Initialization Vector: " + iv);
        }
        send("Algorithm: " + alg);
        send("In: \\n" + hexdump(b2s(plain)));
        send("Out: \\n" + hexdump(b2s(encoded)));
        complete_bytes = [];
        index = 0;
    }

    function hexdump(buffer, blockSize) {
        blockSize = blockSize || 16;
        var lines = [];
        var hex = "0123456789ABCDEF";
        for (var b = 0; b < buffer.length; b += blockSize) {
            var block = buffer.slice(b, Math.min(b + blockSize, buffer.length));
            var addr = ("0000" + b.toString(16)).slice(-4);
            var codes = block.split('').map(function (ch) {
                var code = ch.charCodeAt(0);
                return " " + hex[(0xF0 & code) >> 4] + hex[0x0F & code];
            }).join("");
            codes += "   ".repeat(blockSize - block.length);
            var chars = block.replace(/[\\x00-\\x1F\\x20]/g, '.');
            chars += " ".repeat(blockSize - block.length);
            lines.push(addr + " " + codes + "  " + chars);
        }
        return lines.join("\\n");
    }

    function b2s(array) {
        var result = "";
        for (var i = 0; i < array.length; i++) {
            result += String.fromCharCode(modulus(array[i], 256));
        }
        return result;
    }

    function modulus(x, n) {
        return ((x % n) + n) % n;
    }

    function addtoarray(arr) {
        for (var i = 0; i < arr.length; i++) {
            complete_bytes[index] = arr[i];
            index = index + 1;
        }
    }
});`,

      'bypass_flag_secure': `
Java.perform(function () {
    Java.use('android.view.SurfaceView').setSecure.overload('boolean').implementation = function (flag) {
        send('[1] flag:' + flag);
        this.call(false);
    };
    var LayoutParams = Java.use('android.view.WindowManager$LayoutParams');
    Java.use('android.view.Window').setFlags.overload('int', 'int').implementation = function (flags, mask) {
        send('flag secure: ' + LayoutParams.FLAG_SECURE.value);
        send('before:' + flags);
        flags = (flags.value & ~LayoutParams.FLAG_SECURE.value);
        send('after:' + flags);
        this.call(this, flags, mask);
    };
});`,

      'file_trace': `Java.perform(function () {

    // ============= Config
    var CONFIG = {
        // if TRUE enable data dump
        printEnable: true,
        // if TRUE enable libc.so open/read/write hook
        printLibc: false,
        // if TRUE print the stack trace for each hook
        printStackTrace: false,
        // to filter the file path whose data want to be dumped in ASCII
        dump_ascii_If_Path_contains: [".log", ".xml", ".prop"],
        // to filter the file path whose data want to be NOT dumped in hexdump (useful for big chunk and excessive reads)
        dump_hex_If_Path_NOT_contains: [".png", "/proc/self/task", "/system/lib", "base.apk", "cacert"],
        // to filter the file path whose data want to be NOT dumped fron libc read/write (useful for big chunk and excessive reads)
        dump_raw_If_Path_NOT_contains: [".png", "/proc/self/task", "/system/lib", "base.apk", "cacert"]
    }

    // =============  Keep a trace of file descriptor, path, and so
    var TraceFD = {};
    var TraceFS = {};
    var TraceFile = {};
    var TraceSysFD = {};


    // ============= Get classes
    var CLS = {
        File: Java.use("java.io.File"),
        FileInputStream: Java.use("java.io.FileInputStream"),
        FileOutputStream: Java.use("java.io.FileOutputStream"),
        String: Java.use("java.lang.String"),
        FileChannel: Java.use("java.nio.channels.FileChannel"),
        FileDescriptor: Java.use("java.io.FileDescriptor"),
        Thread: Java.use("java.lang.Thread"),
        StackTraceElement: Java.use("java.lang.StackTraceElement"),
        AndroidDbSQLite: Java.use("android.database.sqlite.SQLiteDatabase")
    };
    var File = {
        new: [
            CLS.File.$init.overload("java.io.File", "java.lang.String"),
            CLS.File.$init.overload("java.lang.String"),
            CLS.File.$init.overload("java.lang.String", "java.lang.String"),
            CLS.File.$init.overload("java.net.URI"),
        ]
    };
    var FileInputStream = {
        new: [
            CLS.FileInputStream.$init.overload("java.io.File"),
            CLS.FileInputStream.$init.overload("java.io.FileDescriptor"),
            CLS.FileInputStream.$init.overload("java.lang.String"),
        ],
        read: [
            CLS.FileInputStream.read.overload(),
            CLS.FileInputStream.read.overload("[B"),
            CLS.FileInputStream.read.overload("[B", "int", "int"),
        ],
    };
    var FileOuputStream = {
        new: [
            CLS.FileOutputStream.$init.overload("java.io.File"),
            CLS.FileOutputStream.$init.overload("java.io.File", "boolean"),
            CLS.FileOutputStream.$init.overload("java.io.FileDescriptor"),
            CLS.FileOutputStream.$init.overload("java.lang.String"),
            CLS.FileOutputStream.$init.overload("java.lang.String", "boolean")
        ],
        write: [
            CLS.FileOutputStream.write.overload("[B"),
            CLS.FileOutputStream.write.overload("int"),
            CLS.FileOutputStream.write.overload("[B", "int", "int"),
        ],
    };



    // ============= Hook implementation

    File.new[1].implementation = function (a0) {
        prettyLog("[Java::File.new.1] New file : " + a0);

        var ret = File.new[1].call(this, a0);
        var f = Java.cast(this, CLS.File);
        TraceFile["f" + this.hashCode()] = a0;


        return ret;
    }
    File.new[2].implementation = function (a0, a1) {
        prettyLog("[Java::File.read.2] New file : " + a0 + "/" + a1);

        var ret = File.new[2].call(this, a0, a1);;
        var f = Java.cast(this, CLS.File);
        TraceFile["f" + this.hashCode()] = a0 + "/" + a1;

        return ret;
    }


    FileInputStream.new[0].implementation = function (a0) {
        var file = Java.cast(a0, CLS.File);
        var fname = TraceFile["f" + file.hashCode()];

        if (fname == null) {
            var p = file.getAbsolutePath();
            if (p !== null)
                fname = TraceFile["f" + file.hashCode()] = p;
        }
        if (fname == null)
            fname = "[unknow]"

        prettyLog("[Java::FileInputStream.new.0] New input stream from file (" + fname + "): ");

        var fis = FileInputStream.new[0].call(this, a0)
        var f = Java.cast(this, CLS.FileInputStream);

        TraceFS["fd" + this.hashCode()] = fname;

        var fd = Java.cast(this.getFD(), CLS.FileDescriptor);

        TraceFD["fd" + fd.hashCode()] = fname;

        return fis;
    }



    FileInputStream.read[1].implementation = function (a0) {
        var fname = TraceFS["fd" + this.hashCode()];
        var fd = null;
        if (fname == null) {
            fd = Java.cast(this.getFD(), CLS.FileDescriptor);
            fname = TraceFD["fd" + fd.hashCode()]
        }
        if (fname == null)
            fname = "[unknow]";

        var b = Java.array('byte', a0);

        prettyLog("[Java::FileInputStream.read.1] Read from file,offset (" + fname + "," + a0 + "):\n" +
            prettyPrint(fname, b));

        return FileInputStream.read[1].call(this, a0);
    }
    FileInputStream.read[2].implementation = function (a0, a1, a2) {
        var fname = TraceFS["fd" + this.hashCode()];
        var fd = null;
        if (fname == null) {
            fd = Java.cast(this.getFD(), CLS.FileDescriptor);
            fname = TraceFD["fd" + fd.hashCode()]
        }
        if (fname == null)
            fname = "[unknow]";

        var b = Java.array('byte', a0);

        prettyLog("[Java::FileInputStream.read.2] Read from file,offset,len (" + fname + "," + a1 + "," + a2 + ")\n" +
            prettyPrint(fname, b));

        return FileInputStream.read[2].call(this, a0, a1, a2);
    }



    // =============== File Output Stream ============



    FileOuputStream.new[0].implementation = function (a0) {
        var file = Java.cast(a0, CLS.File);
        var fname = TraceFile["f" + file.hashCode()];

        if (fname == null)
            fname = "[unknow]<File:" + file.hashCode() + ">";


        prettyLog("[Java::FileOuputStream.new.0] New output stream to file (" + fname + "): ");

        var fis = FileOuputStream.new[0].call(this, a0);

        TraceFS["fd" + this.hashCode()] = fname;

        var fd = Java.cast(this.getFD(), CLS.FileDescriptor);
        TraceFD["fd" + fd.hashCode()] = fname;

        return fis;
    }

    FileOuputStream.new[1].implementation = function (a0) {
        var file = Java.cast(a0, CLS.File);
        var fname = TraceFile["f" + file.hashCode()];

        if (fname == null)
            fname = "[unknow]";


        prettyLog("[Java::FileOuputStream.new.1] New output stream to file (" + fname + "): \n");

        var fis = FileOuputStream.new[1].call(this, a0);

        TraceFS["fd" + this.hashCode()] = fname;

        var fd = Java.cast(this.getFD(), CLS.FileDescriptor);

        TraceFD["fd" + fd.hashCode()] = fname;

        return fis;
    }

    FileOuputStream.new[2].implementation = function (a0) {
        var fd = Java.cast(a0, CLS.FileDescriptor);
        var fname = TraceFD["fd" + fd.hashCode()];

        if (fname == null)
            fname = "[unknow]";


        prettyLog("[Java::FileOuputStream.new.2] New output stream to FileDescriptor (" + fname + "): \n");
        var fis = FileOuputStream.new[1].call(this, a0)

        TraceFS["fd" + this.hashCode()] = fname;

        return fis;
    }
    FileOuputStream.new[3].implementation = function (a0) {
        prettyLog("[Java::FileOuputStream.new.3] New output stream to file (str=" + a0 + "): \n");

        var fis = FileOuputStream.new[1].call(this, a0)

        TraceFS["fd" + this.hashCode()] = a0;
        var fd = Java.cast(this.getFD(), CLS.FileDescriptor);
        TraceFD["fd" + fd.hashCode()] = a0;

        return fis;
    }
    FileOuputStream.new[4].implementation = function (a0) {
        prettyLog("[Java::FileOuputStream.new.4] New output stream to file (str=" + a0 + ",bool): \n");

        var fis = FileOuputStream.new[1].call(this, a0)
        TraceFS["fd" + this.hashCode()] = a0;
        var fd = Java.cast(this.getFD(), CLS.FileDescriptor);
        TraceFD["fd" + fd.hashCode()] = a0;

        return fis;
    }



    FileOuputStream.write[0].implementation = function (a0) {
        var fname = TraceFS["fd" + this.hashCode()];
        var fd = null;

        if (fname == null) {
            fd = Java.cast(this.getFD(), CLS.FileDescriptor);
            fname = TraceFD["fd" + fd.hashCode()]
        }
        if (fname == null)
            fname = "[unknow]";

        prettyLog("[Java::FileOuputStream.write.0] Write byte array (" + fname + "):\n" +
            prettyPrint(fname, a0));

        return FileOuputStream.write[0].call(this, a0);
    }
    FileOuputStream.write[1].implementation = function (a0) {

        var fname = TraceFS["fd" + this.hashCode()];
        var fd = null;
        if (fname == null) {
            fd = Java.cast(this.getFD(), CLS.FileDescriptor);
            fname = TraceFD["fd" + fd.hashCode()]
        }
        if (fname == null)
            fname = "[unknow]";

        prettyLog("[Java::FileOuputStream.write.1] Write int  (" + fname + "): " + a0);


        return FileOuputStream.write[1].call(this, a0);
    }
    FileOuputStream.write[2].implementation = function (a0, a1, a2) {

        var fname = TraceFS["fd" + this.hashCode()];
        var fd = null;
        if (fname == null) {
            fd = Java.cast(this.getFD(), CLS.FileDescriptor);
            fname = TraceFD["fd" + fd.hashCode()]
            if (fname == null)
                fname = "[unknow], fd=" + this.hashCode();
        }

        prettyLog("[Java::FileOuputStream.write.2] Write " + a2 + " bytes from " + a1 + "  (" + fname + "):\n" +
            prettyPrint(fname, a0));

        return FileOuputStream.write[2].call(this, a0, a1, a2);
    }

    // native hooks
    Interceptor.attach(
        Module.findExportByName("libc.so", "read"), {
            // fd, buff, len
            onEnter: function (args) {
                if (CONFIG.printLibc === true) {
                    var bfr = args[1],
                        sz = args[2].toInt32();
                    var path = (TraceSysFD["fd-" + args[0].toInt32()] != null) ? TraceSysFD["fd-" + args[0].toInt32()] : "[unknow path]";

                    prettyLog("[Libc::read] Read FD (" + path + "," + bfr + "," + sz + ")\n" +
                        rawPrint(path, Memory.readByteArray(bfr, sz)));
                }
            },
            onLeave: function (ret) {

            }
        }
    );

    Interceptor.attach(
        Module.findExportByName("libc.so", "open"), {
            // path, flags, mode
            onEnter: function (args) {
                this.path = Memory.readCString(args[0]);
            },
            onLeave: function (ret) {
                TraceSysFD["fd-" + ret.toInt32()] = this.path;
                if (CONFIG.printLibc === true)
                    prettyLog("[Libc::open] Open file '" + this.path + "' (fd: " + ret.toInt32() + ")");
            }
        }
    );


    Interceptor.attach(
        Module.findExportByName("libc.so", "write"), {
            // fd, buff, count
            onEnter: function (args) {
                if (CONFIG.printLibc === true) {
                    var bfr = args[1],
                        sz = args[2].toInt32();
                    var path = (TraceSysFD["fd-" + args[0].toInt32()] != null) ? TraceSysFD["fd-" + args[0].toInt32()] : "[unknow path]";

                    prettyLog("[Libc::write] Write FD (" + path + "," + bfr + "," + sz + ")\n" +
                        rawPrint(path, Memory.readByteArray(bfr, sz)));
                }
            },
            onLeave: function (ret) {

            }
        }
    );



    // helper functions
    function prettyLog(str) {
        send("---------------------------\n" + str);
        if (CONFIG.printStackTrace === true) {
            printStackTrace();
        }
    }

    function prettyPrint(path, buffer) {
        if (CONFIG.printEnable === false) return "";

        if (contains(path, CONFIG.dump_ascii_If_Path_contains)) {
            return b2s(buffer);
        } else if (!contains(path, CONFIG.dump_hex_If_Path_NOT_contains)) {
            return hexdump(b2s(buffer));
        }
        return "[dump skipped by config]";
    }

    function rawPrint(path, buffer) {
        if (CONFIG.printEnable === false) return "";

        if (!contains(path, CONFIG.dump_raw_If_Path_NOT_contains)) {
            return hexdump(buffer);
        }
        return "[dump skipped by config]";
    }

    function contains(path, patterns) {
        for (var i = 0; i < patterns.length; i++)
            if (path.indexOf(patterns[i]) > -1) return true;
        return false;
    }

    function printStackTrace() {
        var th = Java.cast(CLS.Thread.currentThread(), CLS.Thread);
        var stack = th.getStackTrace(),
            e = null;

        for (var i = 0; i < stack.length; i++) {
            send("\t" + stack[i].getClassName() + "." + stack[i].getMethodName() + "(" + stack[i].getFileName() + ")");
        }
    }

    function isZero(block) {
        var m = /^[0\s]+$/.exec(block);
        return m != null && m.length > 0 && (m[0] == block);
    }

    function hexdump(buffer, blockSize) {
        blockSize = blockSize || 16;
        var lines = [];
        var hex = "0123456789ABCDEF";
        var prevZero = false,
            ctrZero = 0;
        for (var b = 0; b < buffer.length; b += blockSize) {
            var block = buffer.slice(b, Math.min(b + blockSize, buffer.length));
            var addr = ("0000" + b.toString(16)).slice(-4);
            var codes = block.split('').map(function (ch) {
                var code = ch.charCodeAt(0);
                return " " + hex[(0xF0 & code) >> 4] + hex[0x0F & code];
            }).join("");
            codes += "   ".repeat(blockSize - block.length);
            var chars = block.replace(/[\\x00-\\x1F\\x20\n]/g, '.');
            chars += " ".repeat(blockSize - block.length);
            if (isZero(codes)) {
                ctrZero += blockSize;
                prevZero = true;
            } else {
                if (prevZero) {
                    lines.push("\t [" + ctrZero + "] bytes of zeroes");
                }
                lines.push(addr + " " + codes + "  " + chars);
                prevZero = false;
                ctrZero = 0;
            }
        }
        if (prevZero) {
            lines.push("\t [" + ctrZero + "] bytes of zeroes");
        }
        return lines.join("\\n");
    }

    function b2s(array) {
        var result = "";
        for (var i = 0; i < array.length; i++) {
            result += String.fromCharCode(modulus(array[i], 256));
        }
        return result;
    }

    function modulus(x, n) {
        return ((x % n) + n) % n;
    }

});`,

      'get_android_id': `Java.perform(function () {
    function getContext() {
        return Java.use('android.app.ActivityThread').currentApplication().getApplicationContext().getContentResolver();
    }
    send('[-]' + Java.use('android.provider.Settings$Secure').getString(getContext(), 'android_id'));
});`,

      'helper': `function bytes2hex(array) {
    var result = '';
    for (var i = 0; i < array.length; ++i)
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    result += ' (' + array.length + ' bytes)'
    return result;
}

function jhexdump(array) {
    var ptr = Memory.alloc(array.length);
    for (var i = 0; i < array.length; ++i)
        Memory.writeS8(ptr.add(i), array[i]);
    send(hexdump(ptr, { offset: 0, length: array.length, header: false, ansi: false }));
}`,

      'hook_constructor': `Java.performNow(function () {
    Java.use('java.lang.StringBuilder').$init.overload('java.lang.String').implementation = function (stringArgument) {
        send("c'tor");
        return this.$init(stringArgument);
    };
});`,

      'hook_java_reflection': `Java.performNow(function () {
    Java.use('java.lang.reflect.Method').invoke.overload('java.lang.Object', '[Ljava.lang.Object;').implementation = function (a, b) {
        send('hooked ' + a + ' ' + b);
        return this.invoke(a, b);
    };
});`,

      'inputstream_dump': `function binaryToHexToAscii(array, readLimit) {
    var result = [];
    // read 100 bytes #performance
    readLimit = readLimit || 100;
    for (var i = 0; i < readLimit; ++i) {
        result.push(String.fromCharCode( // hex2ascii part
            parseInt(
                ('0' + (array[i] & 0xFF).toString(16)).slice(-2), // binary2hex part
                16
            )
        ));
    }
    return result.join('');
}

function hookInputStream() {
    Java.use('java.io.InputStream')['read'].overload('[B').implementation = function (b) {
        // execute original and save return value
        var retval = this.read(b);
        var resp = binaryToHexToAscii(b);
        // conditions to not print garbage packets
        var reExcludeList = new RegExp(['Mmm'/*, 'Ping' /*, ' Yo'*/].join('|'));
        if (!reExcludeList.test(resp)) {
            send(resp);
        }
        var reIncludeList = new RegExp(['AAA', 'BBB', 'CCC'].join('|'));
        if (reIncludeList.test(resp)) {
            send(binaryToHexToAscii(b, 1200));
        }
        return retval;
    };
}

Java.perform(hookInputStream);`,

      'jni_hook_by_address': `var moduleName = "libGLESv2.so";
var nativeFuncAddr = 0x1234; // $ nm --demangle --dynamic libfoo.so | grep "Class::method("

Interceptor.attach(Module.findExportByName(null, "dlopen"), {
    onEnter: function (args) {
        this.lib = Memory.readUtf8String(args[0]);
        send("dlopen called with: " + this.lib);
    },
    onLeave: function (retval) {
        if (this.lib.endsWith(moduleName)) {
            send("ret: " + retval);
            var baseAddr = Module.findBaseAddress(moduleName);
            Interceptor.attach(baseAddr.add(nativeFuncAddr), {
                onEnter: function (args) {
                    send("[-] hook invoked");
                   send(JSON.stringify({
                        a1: args[1].toInt32(),
                        a2: Memory.readUtf8String(Memory.readPointer(args[2])),
                        a3: Boolean(args[3])
                    }, null, '\t'));
                }
            });
        }
    }
});`,
  'jni_trace': `Java.perform(function () {
    // Low-level intercept and backtrace example
    Interceptor.attach(Module.findExportByName("/system/lib/libc.so", "open"), {
        onEnter: function (args) {
            // debug only the intended calls
            this.flag = false;
            // var filename = Memory.readCString(ptr(args[0]));
            // if (filename.indexOf("XYZ") === -1 && filename.indexOf("ZYX") === -1) // exclusion list
            // if (filename.indexOf("my.interesting.file") !== -1) // inclusion list
            this.flag = true;
            if (this.flag) {
                var filename = Memory.readCString(ptr(args[0]));
                send("\nfile name: " + filename);
                // print backtrace
                send("\nBacktrace:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE)
                    .map(DebugSymbol.fromAddress).join("\n"));
            }
        },
        onLeave: function (retval) {
            if (this.flag) {
                // print retval
                send("\nretval: " + retval);
            }
        }

    });

});`,

    }
  ;




}
