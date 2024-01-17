//#FILENAME:src/generated/java/{{packagePath @root.options.basePackage}}/clients/{{java-class-name this}}Client.java:write-always
/**
 * GENERATED SOURCE - DO NOT EDIT
 */
package {{packageName @root.options.basePackage}}.clients;

import com.kapeta.spring.annotation.KapetaRestClient;
import retrofit2.Call;
import retrofit2.http.*;
import java.util.*;
{{java-imports}}


{{java-controller-client this}}